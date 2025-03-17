<template>
  <v-row dense>
    <v-col cols="12" align="right">
      <UtcTime :time="maxMarchTime" label="Max March Time" />
    </v-col>
    <v-col cols="12">
      <MarchTypeToggle
        v-model="marchSettingsType"
        :show-settings-cog="false"
        :show-details="false"
      />
    </v-col>
    <v-col cols="12">
      <v-checkbox
        v-model="marchSettingStore.landingSettings.ignoreSeconds"
        label="Round up to the next minute"
        hide-details
        @change="savePageData"
      />
    </v-col>
    <v-col cols="12" class="mt-4">
      <v-row>
        <v-col cols="6" sm="auto">
          <time-text-box-auto-format
            v-model="marchSettingStore.landingSettings.separateSeconds"
            label="March Separation Seconds"
            width="200px"
            @update:model-value="savePageData"
          />
        </v-col>
        <v-col cols="6" sm="auto">
          <turret-offset-display
            v-model="marchSettingStore.landingSettings.turretStrikeSeconds"
            @update:model-value="updateTurretStrikeSeconds"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-row dense class="my-4">
      <v-col cols="12">
        <!-- options: 1,2,5,10,15,20,30, 60 -->
        <v-text-field
          v-model="marchSettingStore.landingSettings.rallyMinutes"
          type="number"
          inputmode="numeric"
          pattern="[0-9]*"
          label="Rally Minutes"
          width="100%"
          @update:model-value="(newValue:string) => {
              savePageData();
              marchSettingStore.landingSettings.rallyMinutes = parseInt(
                newValue
              );
            }"
        />
      </v-col>
    </v-row>
  </v-row>
  <time-text-box-auto-format
    v-model="marchSettingStore.landingSettings.landingTime"
    :include-hours="true"
    label="Landing Time"
    hint="UTC in HHMMSS format"
    persistent-hint
    label-append-icon="mdi-refresh"
    class="mt-4"
    width="100%"
    @update:model-value="savePageData"
    @label-append-action="refreshLandingTime"
  />
</template>

<script setup lang="ts">
import type { Time } from "@/models";
import { getTimeFromSeconds } from "@/services/time-helpers";
import {
  useMarchSettingStore,
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

const updateTurretStrikeSeconds = (seconds: number | undefined) => {
  // console.log("updateTurretStrikeSeconds", seconds);
  marchSettingStore.landingSettings.turretStrikeSeconds = seconds;
  marchSettingStore.saveData();
};

const refreshLandingTime = () => {
  const targets = memberStore.getSelectedTargets(
    memberStore.selectedTargetName
  );
  marchSettingStore.refreshLandingTime(targets);
  marchSettingStore.saveData();
};

const savePageData = () => {
  marchSettingStore.saveData();
  maxMarchTime.value = getMaxMarchTime();
};
</script>
