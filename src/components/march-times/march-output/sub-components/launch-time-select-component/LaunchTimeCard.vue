<template>
  <MarchTimeCardBase
    title="Launch Time"
    prepend-icon="mdi-rocket-launch"
    :is-selected="marchSettingsType === 'launch'"
    :show-details="showDetails"
    @click="marchSettingsType = 'launch'"
  >
    <div>
      <label>
        Push rally start times back by
        {{ formatTime(marchSettingStore.launchSettings.launchTimeOffset) }}
      </label>
      <br />
      <label>
        Each rally offset by
        {{ marchSettingStore.launchSettings.separateSeconds.seconds }}
        seconds
      </label>
      <br />
      <label v-if="marchSettingStore.launchSettings.ignoreSeconds">
        Round up to the nearest minute
      </label>
      <label v-else> Do not round up to the nearest minute </label>
    </div>
  </MarchTimeCardBase>
</template>

<script setup lang="ts">
import { formatTime } from "@/services/time-helpers";
import {
  useMarchSettingStore,
  type MarchSettingsType,
} from "@/stores/march-settings-store";
const marchSettingStore = useMarchSettingStore();
const marchSettingsType = defineModel<MarchSettingsType>({ required: true });
defineProps<{
  showDetails: boolean;
}>();
</script>
