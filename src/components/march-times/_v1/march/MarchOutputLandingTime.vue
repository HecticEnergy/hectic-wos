<template>
  <HowToUse>
    <HtuLandingTime />
  </HowToUse>
  <v-row dense>
    <v-col
      cols="12"
      align="right"
    >
      <UtcClock label="Current UTC Time" />
    </v-col>

    <v-col cols="12">
      <MemberSelection
        v-model="selectedGroup"
        @update:model-value="setOutput"
      />
    </v-col>
    <v-col cols="12">
      <!-- Targets -->
      <TargetSelection
        v-model="selectedTarget"
        @update:model-value="savePageData"
      />
    </v-col>
    <v-col
      v-if="!!selectedTarget"
      cols="12"
      align="right"
    >
      <span class="opacity-80">
        Max March Time: {{ formatTimeFromSeconds(maxMarchSeconds) }}
      </span>
    </v-col>
  </v-row>
  <v-row
    dense
    class="my-4"
  >
    <v-col cols="12">
      Rally Time (minutes)
    </v-col>
    <v-col
      cols="12"
      align="center"
    >
      <!-- options: 1,2,5,10,15,20,30, 60 -->
      <v-slider
        v-model="rallyTimeMinutesIndex"
        :ticks="rallyTimeTicks"
        :max="rallyMinuteOptions.length - 1"
        :step="1"
        :tick-size="1"
        show-ticks="always"
        @click="savePageData"
      />
    </v-col>
  </v-row>
  <v-row dense>
    <v-col cols="12">
      Offset Rallies by Seconds
    </v-col>
    <v-col cols="auto">
      <NumberTextField
        v-model="separateSeconds"
        label="Seconds"
        width="100"
        @change="savePageData"
      />
    </v-col>

    <v-col cols="auto">
      <v-checkbox
        v-model="ignoreSeconds"
        label="Ignore Seconds"
        hide-details
        @change="savePageData"
      />
    </v-col>
  </v-row>
  <TimeTextBoxes
    v-model="landingTime"
    label="Target Landing Time"
    label-append-icon="mdi-refresh"
    @label-append-action="refreshLandingTime"
    @change="savePageData"
  />
  <v-row dense>
    <v-col
      :key="passedAlertKey"
      cols="auto"
    >
      <v-alert
        v-show="hasRallyStartTimePassed"
        text="Rally start time has passed!"
        color="error"
      />
    </v-col>
  </v-row>

  <MarchOutputDisplay
    v-if="selectedMembers.length > 0"
    :launch-time-output="nameTimeDisplay"
    unique-id="march-landing-time-output"
    @refresh-output="setOutput"
  />
</template>
<script setup lang="ts">
import {
  getOffsetUtcTime,
  formatTimeFromSeconds,
  formatTimeHMS,
  getSecondsFromTime,
  getUtcTime,
  getTimeFromSeconds,
  getSecondsFromTimeSMH,
} from "@/services/time-helpers";
import * as LocalStorage from "@/services/local-storage";

import { useMemberStore } from "@/stores/member-store";
import type { MemberTarget, TargetProps, Time } from "@/models";
const memberStore = useMemberStore();
let interval: number | undefined | NodeJS.Timeout;

const localStorageKey = "march-output-landing";
type LocalStorageValue = {
  rallyStartIdx: number;
  separateSeconds: number;
  ignoreSeconds: boolean;
  landingTime: Time;
};

onMounted(() => {
  interval = setInterval(() => {
    passedAlertKey.value++;
    // console.log("interval", passedAlertKey.value);
  }, 1000);

  const marchTimeInfo = LocalStorage.load<LocalStorageValue>(localStorageKey);
  if (!!marchTimeInfo) {
    rallyTimeMinutesIndex.value = marchTimeInfo.rallyStartIdx;
    separateSeconds.value = marchTimeInfo.separateSeconds;
    ignoreSeconds.value = marchTimeInfo.ignoreSeconds;
    landingTime.value = marchTimeInfo.landingTime;
  }

  if (memberStore.allTargetNames.length === 1) {
    selectedTarget.value = memberStore.allTargetNames[0];
  }
  // TODO: Local Storage
  refreshLandingTime();
  setOutput();
});

onDeactivated(() => {
  if (!!interval) clearInterval(interval);
});

const savePageData = () => {
  LocalStorage.save<LocalStorageValue>(localStorageKey, {
    rallyStartIdx: rallyTimeMinutesIndex.value,
    separateSeconds: separateSeconds.value,
    ignoreSeconds: ignoreSeconds.value,
    landingTime: JSON.parse(JSON.stringify(landingTime.value)),
  });
  passedAlertKey.value++;
  setOutput();
  hasRallyStartTimePassed.value = calculateHasRallyStartTimePassed();
};

const selectedGroup = ref<string>("");
const selectedMembers = ref<{ name: string; time: string }[]>([]);

const selectedTarget = ref<string>();
const maxMarchSeconds = computed(() => {
  return memberStore.getMaxMarchSeconds(selectedTarget.value);
});

const rallyMinuteOptions = ["0", "1", "2", "5", "10", "15", "20", "30", "60"];
//turn array into {0: "1", 1: "2", ...}
const rallyTimeTicks = (() => {
  const obj = {};
  rallyMinuteOptions.forEach((val, idx) => {
    //@ts-expect-error - obj[idx] is valid
    obj[idx] = val;
  });
  return obj;
})();

// console.log(rallyTimeTicks);
const rallyTimeMinutesIndex = ref(2);
const rallyTimeMinutes = computed(() =>
  parseInt(rallyMinuteOptions[rallyTimeMinutesIndex.value])
);

const separateSeconds = ref<number>(0);
const ignoreSeconds = ref<boolean>(true);

const landingTime = ref<Time>({ hours: 0, minutes: 0, seconds: 0 });
const refreshLandingTime = () => {
  console.log("refreshLandingTime");
  const currentUtcTime = getOffsetUtcTime(
    new Date(),
    rallyTimeMinutes.value,
    separateSeconds.value + maxMarchSeconds.value,
    ignoreSeconds.value
  );
  landingTime.value = currentUtcTime;
  setOutput();
};

const passedAlertKey = ref<number>(0);
const hasRallyStartTimePassed = ref(false);

watch(passedAlertKey, () => {
  hasRallyStartTimePassed.value = calculateHasRallyStartTimePassed();
});

const calculateHasRallyStartTimePassed = () => {
  const launchTimes = getLaunchTimes();
  if (launchTimes.length === 0) return false;
  const minRallyStartTimeSeconds = launchTimes.reduce((min, lt) => {
    const seconds = getSecondsFromTime({
      hours: lt.utcHours,
      minutes: lt.utcMinutes,
      seconds: lt.utcSeconds,
    });
    const newMin = Math.min(min, seconds);
    return newMin;
  }, Number.MAX_VALUE);
  const nowUtc = getUtcTime(new Date());
  const utcSeconds = getSecondsFromTime(nowUtc);

  return utcSeconds > minRallyStartTimeSeconds;
};

const getLaunchTimes = () => {
  if (!selectedTarget.value) return [];

  const selectedMemberTimes = memberStore.getMemberSelectedTime(
    selectedTarget.value!,
    selectedGroup.value,
  );

  const launchTimes = deductFromUtcTime(
    selectedMemberTimes,
    landingTime.value,
    { hours: 0, minutes: rallyTimeMinutes.value, seconds: 0 },
    separateSeconds.value
  );
  return launchTimes;
};

//TODO: this is largely duplicated from MarchOutputLaunchTime, consider refactoring
const setOutput = () => {
  const launchTimes = getLaunchTimes();
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


const deductFromUtcTime = (
  memberTargets: MemberTarget[],
  utcArrivalTime: Time,
  offsetTime: Time,
  addedSeconds?: number
) => {
  const sortedTargetsExtraProps = sortAndPrepTargets(
    memberTargets,
    addedSeconds
  );

  const utcArrivalTotalSeconds = getSecondsFromTime(utcArrivalTime);
  const offsetTotalSeconds = getSecondsFromTime(offsetTime);

  const memberLandingTimes = sortedTargetsExtraProps.map((target) => {
    const launchTime = calculateLaunchFromArrivalTime(
      utcArrivalTotalSeconds,
      offsetTotalSeconds,
      target.totalSeconds,
      target.addedSecondsOffset
    );
    return {
      memberName: target.target.memberName,
      utcHours: launchTime.hours,
      utcMinutes: launchTime.minutes,
      utcSeconds: launchTime.seconds,
    };
  });
  return memberLandingTimes;
};

const calculateLaunchFromArrivalTime = (
  utcArrivalTotalSeconds: number,
  offsetTotalSeconds: number,
  marchTotalSeconds: number,
  addedSeconds: number
) => {
  /*
  To calculate launch time based on landing time...
  CT = time for caller to call
  T = Time provided by user (arrival time - rally time (offset))
  MT = March Time
  S = offset by seconds (staggering landing times)

  CT = T - MT + S
  */

  const memberMarchTime = marchTotalSeconds + (addedSeconds ?? 0);

  const launchTimeSeconds =
    utcArrivalTotalSeconds - offsetTotalSeconds - memberMarchTime;
  const time = getTimeFromSeconds(launchTimeSeconds);
  return time;
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

</script>
