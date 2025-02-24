<template>
  <HowToUse>
    <HtuLaunchTime />
  </HowToUse>
  <v-row dense>
    <v-col cols="12" align="right">
      <UtcClock label="Current UTC Time" />
    </v-col>
    <v-col cols="12" align="right">
      <span class="opacity-80">UTC Time with Offset: {{ utcTimeOffset }}</span>
    </v-col>
  </v-row>
  <TimeTextBoxes
    v-model="timeOffsetModel"
    label="Offset UTC By"
    @change="savePageData"
  />
  <v-row dense class="my-4">
    <v-col cols="auto">
      <v-checkbox
        v-model="ignoreSeconds"
        label="Round up to the next minute"
        hide-details
        @change="savePageData"
      />
    </v-col>
  </v-row>
  <TimeTextBoxes
    v-model="separateSeconds"
    class="mt-4"
    label="Separate Each March By"
    @change="savePageData"
  />
  <v-row dense class="mt-4">
    <v-col cols="12">
      <MemberSelection
        v-model="selectedGroup"
        @update:model-value="setOutput"
      />
    </v-col>
    <v-col cols="12">
      <TargetSelect
        v-model="selectedTarget"
        @update:model-value="savePageData"
      />
    </v-col>
    <v-col cols="12">
      <v-btn
        color="primary"
        :disabled="selectedMembers.length === 0"
        @click="dialogOpen = true"
      >
        show Output
      </v-btn>
    </v-col>
  </v-row>
  <dialog-full-screen v-model="dialogOpen" title="Output">
    <v-row dense class="d-flex justify-center">
      <v-col cols="auto">
        <MarchOutputDisplay
          v-if="selectedMembers.length > 0"
          :launch-time-output="nameTimeDisplay"
          unique-id="march-launch-time-output"
          @refresh-output="setOutput"
        />
      </v-col>
    </v-row>
  </dialog-full-screen>
</template>

<script setup lang="ts">
import {
  formatTimeHMS,
  getOffsetUtcTimeFormatted,
  getSecondsFromTime,
  getSecondsFromTimeSMH,
  getTimeFromSeconds,
} from "@/services/time-helpers";
import * as LocalStorage from "@/services/local-storage";

import { useMemberStore } from "@/stores/member-store";
import type { MemberTarget, TargetProps, Time } from "@/models";
const memberStore = useMemberStore();

const dialogOpen = ref<boolean>(false);
type LocalStorageValue = {
  minutes: number;
  seconds: number;
  ignoreSeconds: boolean;
  separateSeconds: number;
};
const localStorageKey = "march-times-info";
onMounted(() => {
  const marchTimeInfo = LocalStorage.load<LocalStorageValue>(localStorageKey);
  // console.log("LoadLocalStorage", marchTimeInfo);
  if (!!marchTimeInfo) {
    timeOffsetModel.value = {
      minutes: marchTimeInfo.minutes,
      seconds: marchTimeInfo.seconds,
    };
    ignoreSeconds.value = marchTimeInfo.ignoreSeconds;
    separateSeconds.value = { seconds: marchTimeInfo.separateSeconds };
  }
  if (memberStore.allTargetNames.length === 1) {
    selectedTarget.value = memberStore.allTargetNames[0];
    setOutput();
  }
});

const savePageData = () => {
  // console.log("savePageData", timeOffsetModel.value);
  LocalStorage.save<LocalStorageValue>(localStorageKey, {
    minutes: timeOffsetModel.value.minutes,
    seconds: timeOffsetModel.value.seconds,
    ignoreSeconds: ignoreSeconds.value,
    separateSeconds: separateSeconds.value.seconds,
  });
  setOutput();
};

const timeOffsetModel = ref<{
  hours?: number;
  minutes: number;
  seconds: number;
}>({
  minutes: 0,
  seconds: 0,
});
const ignoreSeconds = ref<boolean>(true);
const separateSeconds = ref<{
  hours?: number;
  minutes?: number;
  seconds: number;
}>({ seconds: 0 });

const utcTimeOffset = ref<string>(
  getOffsetUtcTimeFormatted(
    timeOffsetModel.value.minutes,
    timeOffsetModel.value.seconds,
    ignoreSeconds.value
  )
);

const updateTimerKey = ref<number>(0);
setInterval(() => updateTimerKey.value++, 1000);
watch(updateTimerKey, () => {
  utcTimeOffset.value = getOffsetUtcTimeFormatted(
    timeOffsetModel.value.minutes,
    timeOffsetModel.value.seconds,
    ignoreSeconds.value
  );
});

const selectedGroup = ref<string>("");
const selectedMembers = ref<{ name: string; time: string }[]>([]);

const selectedTarget = ref<string>("");
//TODO: this is largely duplicated in MarchOutputLandingTime, consider refactoring
const setOutput = () => {
  if (!selectedTarget.value) return [];

  const selectedMemberTimes = memberStore.getMemberSelectedTime(
    selectedTarget.value!,
    selectedGroup.value
  );

  const date = new Date();
  const launchTimes = addUtcTime(
    selectedMemberTimes,
    {
      hours: date.getUTCHours(),
      minutes: date.getUTCMinutes() + (ignoreSeconds.value ? 1 : 0),
      seconds: ignoreSeconds.value ? 0 : date.getUTCSeconds(),
    },
    timeOffsetModel.value.minutes,
    timeOffsetModel.value.seconds,
    separateSeconds.value.seconds
  );

  const output = launchTimes.map((lt) => {
    return {
      name: lt.memberName,
      time: formatTimeHMS(lt.utcHours, lt.utcMinutes, lt.utcSeconds),
    };
  });

  selectedMembers.value = output;
};

const nameTimeDisplay = computed(() => {
  return getNameTimesDisplay(selectedMembers.value);
});

const getNameTimesDisplay = (nameTimes: { name: string; time: string }[]) => {
  let display =
    memberStore.allTargetNames.length > 1 ? selectedTarget.value + "\n" : "";
  display += nameTimes.map((nt) => `${nt.time} - ${nt.name}`).join("\n");
  return display;
};

const addUtcTime = (
  memberTargets: MemberTarget[],
  utcTime: Time,
  minuteOffset: number,
  secondsOffset: number,
  addedSeconds?: number
): {
  memberName: string;
  utcHours: number;
  utcMinutes: number;
  utcSeconds: number;
}[] => {
  // console.log('member Targets', memberTargets);
  const sortedTargetsExtraProps = sortAndPrepTargets(
    memberTargets,
    addedSeconds
  );
  // Find max march time
  const maxMemberTime = Math.max(
    ...sortedTargetsExtraProps.map((target) => target.totalSeconds)
  );

  //   console.log('sorted targets', sortedTargets);

  const utcTotalSeconds = getSecondsFromTime(utcTime);
  const offsetInSeconds = getSecondsFromTimeSMH(secondsOffset, minuteOffset);
  // console.log("sorted Targets", sortedTargetsExtraProps, maxMemberTime);
  // Calculate the landing time for each member
  const memberTimes = sortedTargetsExtraProps.map((target) => {
    // console.log('added seconds offset', addedSecondsOffset);

    const launchTime = calculateTimeToLaunchFromInitialStartTime(
      utcTotalSeconds,
      offsetInSeconds,
      target.totalSeconds,
      maxMemberTime,
      target.addedSecondsOffset
    );
    // console.log("launch time", launchTime);

    return {
      memberName: target.target.memberName,
      utcHours: launchTime.hours,
      utcMinutes: launchTime.minutes,
      utcSeconds: launchTime.seconds,
    };
  });

  return memberTimes;
};

const sortAndPrepTargets = (
  memberTargets: MemberTarget[],
  addedSeconds?: number
): TargetProps[] => {
  const sortedTargets = memberTargets.sort((a, b) => a.order - b.order);

  const sortedTargetsExtraProps = sortedTargets.map(
    (target, idx): TargetProps => {
      const addedSecondsOffset = (addedSeconds ?? 0) * idx;
      const totalSeconds = getSecondsFromTimeSMH(
        target.seconds,
        target.minutes
      );
      return { target, totalSeconds, addedSecondsOffset };
    }
  );

  return sortedTargetsExtraProps;
};

const calculateTimeToLaunchFromInitialStartTime = (
  utcTotalSeconds: number,
  offsetInTotalSeconds: number,
  marchInSeconds: number,
  maxMarchInSeconds: number,
  addedSeconds?: number
) => {
  // console.log('CalcTimeAndThings', offsetInTotalSeconds, marchInSeconds, maxMarchInSeconds, addedSeconds);
  //targetArrivalTime does not include rally time
  const groupTargetedArrivalTime =
    utcTotalSeconds + offsetInTotalSeconds + maxMarchInSeconds;
  const memberMarchTime = marchInSeconds + (addedSeconds ?? 0);
  const launchTimeSeconds = groupTargetedArrivalTime - memberMarchTime;

  const time = getTimeFromSeconds(launchTimeSeconds);
  // console.log("time", time);
  return time;
};

//
</script>
