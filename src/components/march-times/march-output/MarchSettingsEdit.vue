<template>
  <ParentCard>
    <template #topContent>
      <div align="right">
        <UtcClock label="Current UTC Time" />
      </div>

      <v-row dense>
        <v-col cols="12" align="right">
          <UtcTime
            v-if="marchSettingsType === 'landing'"
            :time="maxMarchTime"
            label="Max March Time"
          />

          <UtcClock
            v-else-if="marchSettingsType === 'launch'"
            :offset-minutes="
              marchSettingStore.launchSettings.launchTimeOffset.minutes
            "
            :offset-seconds="
              marchSettingStore.launchSettings.launchTimeOffset.seconds
            "
            :ignore-seconds="marchSettingStore.launchSettings.ignoreSeconds"
            label="First Arrival Time"
          />
        </v-col>
      </v-row>
    </template>
    <v-row dense class="my-2">
      <v-col cols="12">
        <MarchTypeToggle
          v-model="marchSettingsType"
          :show-settings-cog="false"
          :show-details="false"
        />
      </v-col>
      <v-col cols="12">
        <v-checkbox
          v-if="marchSettingsType === 'landing'"
          v-model="marchSettingStore.landingSettings.ignoreSeconds"
          label="Round up to the next minute"
          hide-details
          @change="savePageData"
        />
        <v-checkbox
          v-else-if="marchSettingsType === 'launch'"
          v-model="marchSettingStore.launchSettings.ignoreSeconds"
          label="Round up to the next minute"
          hide-details
          @change="savePageData"
        />
      </v-col>
      <v-col cols="12">
        <TimeTextBoxes
          v-if="marchSettingsType === 'landing'"
          v-model="marchSettingStore.landingSettings.separateSeconds"
          class="mt-4"
          label="Separate Each March By"
          @change="savePageData"
        />
        <TimeTextBoxes
          v-else-if="marchSettingsType === 'launch'"
          v-model="marchSettingStore.launchSettings.separateSeconds"
          class="mt-4"
          label="Separate Each March By"
          @change="savePageData"
        />
      </v-col>
      <v-col cols="12" />
      <v-col cols="12" />
    </v-row>

    <div v-if="marchSettingsType === 'landing'">
      <v-row dense class="my-4">
        <v-col cols="12"> Rally Time (minutes) </v-col>
        <v-col cols="12" align="center">
          <!-- options: 1,2,5,10,15,20,30, 60 -->
          <v-slider
            v-model="marchSettingStore.landingSettings.rallyTimeMinutesIndex"
            :ticks="marchSettingStore.rallyTimeTicks"
            :max="rallyMinuteOptions.length - 1"
            :step="1"
            :tick-size="1"
            show-ticks="always"
            @click="savePageData"
          />
        </v-col>
      </v-row>
      <TimeTextBoxes
        v-model="marchSettingStore.landingSettings.landingTime"
        class="mt-4"
        label="Landing Time"
        label-append-icon="mdi-refresh"
        @change="savePageData"
        @label-append-action="refreshLandingTime"
      />
    </div>
    <div v-if="marchSettingsType === 'launch'">
      <TimeTextBoxes
        v-model="marchSettingStore.launchSettings.launchTimeOffset"
        class="mt-4"
        label="Offset Launch Time By"
        @change="savePageData"
      />
    </div>
  </ParentCard>
</template>

<script setup lang="ts">
import type { Time } from "@/models";
import { getTimeFromSeconds } from "@/services/time-helpers";
import {
  useMarchSettingStore,
  rallyMinuteOptions,
  type MarchSettingsType,
} from "@/stores/march-settings-store";
import { useMemberStore } from "@/stores/member-store";

const marchSettingStore = useMarchSettingStore();
const memberStore = useMemberStore();

onMounted(() => {
  maxMarchTime.value = getMaxMarchTime();
  // console.log("maxMarchTime", maxSeconds, time, maxMarchTime.value);
});

const marchSettingsType = ref<MarchSettingsType>(
  marchSettingStore.marchSettingsType
);

const getMaxMarchTime = () => {
  const targets = memberStore.getSelectedTargets(
    memberStore.selectedTargetName
  );
  return getTimeFromSeconds(marchSettingStore.getMaxMarchSeconds(targets));
};
const maxMarchTime = ref<Time>(getMaxMarchTime());

const refreshLandingTime = () => {
  const targets = memberStore.getSelectedTargets(
    memberStore.selectedTargetName
  );
  const maxMarchSeconds = marchSettingStore.getMaxMarchSeconds(targets);
  marchSettingStore.refreshLandingTime(maxMarchSeconds);
  marchSettingStore.saveData();
};

const savePageData = () => {
  marchSettingStore.saveData();
  maxMarchTime.value = getMaxMarchTime();
};
</script>
