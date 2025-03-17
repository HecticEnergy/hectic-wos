<template>
  <ParentCard>
    <template #topContent>
      <div align="right">
        <UtcClock label="Current UTC Time" />
      </div>

      <v-slide-x-reverse-transition v-model="marchSettingsType">
        <landing-time-edit v-if="marchSettingsType === 'landing'" />
      </v-slide-x-reverse-transition>
      <v-row dense>
        <v-col cols="12" align="right">
          <UtcClock
            v-if="marchSettingsType === 'launch'"
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
          v-if="marchSettingsType === 'launch'"
          v-model="marchSettingsType"
          :show-settings-cog="false"
          :show-details="false"
        />
      </v-col>
      <v-col cols="12">
        <v-checkbox
          v-model="marchSettingStore.launchSettings.ignoreSeconds"
          if="marchSettingsType === 'launch'"
          label="Round up to the next minute"
          hide-details
          @change="savePageData"
        />
      </v-col>
      <v-col v-if="marchSettingsType === 'launch'" cols="12">
        <TimeTextBoxes
          v-model="marchSettingStore.launchSettings.separateSeconds"
          class="mt-4"
          label="March Separation"
          @change="savePageData"
        />
      </v-col>
      <v-col cols="12" />
      <v-col cols="12" />
    </v-row>
    <div v-if="marchSettingsType === 'launch'">
      <TimeTextBoxes
        v-model="marchSettingStore.launchSettings.launchTimeOffset"
        class="mt-4"
        label="Offset Launch Time By"
        @change="savePageData"
      />
    </div>
    <template #bottomContent>
      <ButtonContainer>
        <v-btn
          prepend-icon="mdi-check"
          color="success"
          width="100%"
          @click="done"
        >
          Done
        </v-btn>
      </ButtonContainer>
    </template>
  </ParentCard>
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

const emit = defineEmits<{
  (e: "close"): void;
}>();

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

const done = () => {
  savePageData();
  emit("close");
};

const savePageData = () => {
  marchSettingStore.saveData();
  maxMarchTime.value = getMaxMarchTime();
};
</script>
