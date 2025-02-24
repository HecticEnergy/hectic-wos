<template>
  <ParentCard>
    <template #topContent>
      <div align="right">
        <UtcClock label="Current UTC Time" />
      </div>
    </template>
    <v-row dense>
      <v-col cols="12">
        <TargetSelect
          v-model="memberStore.selectedTargetName"
          @update:model-value="savePageData"
        />
      </v-col>
      <v-col cols="12">
        <MembersSelect :default-open-edit="openImport" @change="savePageData" />
      </v-col>
      <v-col cols="12">
        <MarchTypeToggle @change="savePageData" />
      </v-col>
      <v-col cols="12" align="right">
        <!-- Right: UTC Earliest March Time -->
      </v-col>
      <v-col cols="12">
        <MarchOutputDisplay
          v-if="canCalculate"
          class="mt-2"
          :launch-time-output="marchTimeOutput"
          unique-id="march-times-march-landing-time-output"
          @refresh-output="setOutput"
        />
      </v-col>
    </v-row>
    <template #bottomContent>
      <!-- Error box (if error) -->
    </template>
  </ParentCard>
</template>

<script setup lang="ts">
import { useMemberStore } from "@/stores/member-store";
import { useMarchSettingStore } from "@/stores/march-settings-store";
import {
  addUtcTimeLaunch,
  deductFromUtcTimeLanding,
  formatTime,
} from "@/services/time-helpers";
import type { TargetOutputItem } from "@/models";

const memberStore = useMemberStore();
const marchSettingStore = useMarchSettingStore();

onBeforeMount(() => {
  memberStore.loadData();
  marchSettingStore.loadData();
  // openImport.value = memberStore.members.length === 0;
});

const marchTimeOutput = ref<string>("");

const canCalculate = computed(() => {
  return (
    !!memberStore.getSelectedMembers().length &&
    (!!memberStore.selectedTargetName.length ||
      memberStore.allTargetNames.length === 1)
  );
});

const openImport = computed(() => memberStore.members.length === 0);

const savePageData = () => {
  //localStorage save
  setOutput();
};

const setOutput = () => {
  console.log("setOutput");
  const rallies =
    marchSettingStore.marchSettingsType === "launch"
      ? calcLaunchTime()
      : calcLandingTime();

  marchTimeOutput.value = formatNameTimesDisplay(rallies);
};

const calcLandingTime = () => {
  if (!memberStore.selectedTargetName) return [];

  const selectedMemberTimes = memberStore.getMemberSelectedTime(
    memberStore.selectedTargetName!
  );

  const launchTimes = deductFromUtcTimeLanding(
    selectedMemberTimes,
    marchSettingStore.landingSettings,
    marchSettingStore.rallyTimeMinutes
  );
  return launchTimes;
};

const calcLaunchTime = () => {
  if (!memberStore.selectedTargetName) return [];

  const selectedMemberTimes = memberStore.getMemberSelectedTime(
    memberStore.selectedTargetName
  );

  const launchTimes = addUtcTimeLaunch(
    selectedMemberTimes,
    new Date(),
    marchSettingStore.launchSettings
  );

  return launchTimes;
};

const formatNameTimesDisplay = (nameTimes: TargetOutputItem[]) => {
  let display =
    memberStore.allTargetNames.length > 1
      ? memberStore.selectedTargetName + "\n"
      : "";
  display += nameTimes
    .map((nt) => `${formatTime(nt.time)} - ${nt.memberName}`)
    .join("\n");
  return display;
};
</script>
