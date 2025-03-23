<template>
  <MarchTimeCardBase
    title="Landing Time"
    prepend-icon="mdi-map-marker"
    :is-selected="marchSettingsType === 'landing'"
    :show-details="showDetails"
    data-tour="march-landing-time-card"
    @click="marchSettingsType = 'landing'"
  >
    <div>
      <label>{{ marchSettingStore.rallyTimeMinutes }} Minute Rallies</label>
      <br />
      <label>
        Each rally offset by
        {{ marchSettingStore.landingSettings.separateSeconds.seconds }}
        seconds
      </label>
      <br />
      <label v-if="marchSettingStore.landingSettings.ignoreSeconds">
        Round up to the nearest minute
      </label>
      <label v-else> Do not round up to the nearest minute </label>
      <label>
        Targeting landing time of
        <v-chip
          :key="marchWillBeLateKey"
          :color="marchWillBeLate ? 'error' : 'default'"
          variant="flat"
          size="small"
          prepend-icon="mdi-refresh"
          style="z-index: 10000"
          @click="refreshLandingTime"
        >
          {{ landingTime }} UTC
        </v-chip>
      </label>
    </div>
  </MarchTimeCardBase>
</template>

<script setup lang="ts">
import {
  deductFromUtcTimeLanding,
  formatTime,
  getSecondsFromTime,
  getUtcTime,
} from "@/services/time-helpers";

import {
  useMarchSettingStore,
  type MarchSettingsType,
} from "@/stores/march-settings-store";

import { useMemberStore } from "@/stores/member-store";

const marchSettingStore = useMarchSettingStore();
const memberStore = useMemberStore();

const marchSettingsType = defineModel<MarchSettingsType>({ required: true });
defineProps<{
  showDetails: boolean;
}>();

let interval: number | undefined | NodeJS.Timeout;
onMounted(() => {
  interval = setInterval(() => {
    marchWillBeLateKey.value++;
    // marchMin.value = getMarchMin();
    marchWillBeLate.value = getMarchWillBeLate();
  }, 250);
});
onUnmounted(() => {
  if (interval) clearInterval(interval);
});

const landingTime = computed(() => {
  return formatTime(marchSettingStore.landingSettings.landingTime);
});
const marchWillBeLateKey = ref(0);

const getMarchWillBeLate = () => {
  const utcSeconds = getSecondsFromTime(getUtcTime(new Date()));

  const selectedMemberTimes = memberStore.getMemberSelectedTime(
    memberStore.selectedTargetName!
  );

  const launchTimes = deductFromUtcTimeLanding(
    selectedMemberTimes,
    marchSettingStore.landingSettings,
    marchSettingStore.rallyTimeMinutes
  );

  const marchStartSeconds = Math.min(
    ...launchTimes.map((time) => getSecondsFromTime(time.time))
  );

  return utcSeconds > marchStartSeconds;
};
const marchWillBeLate = ref(getMarchWillBeLate());

const refreshLandingTime = () => {
  const targets = memberStore.getSelectedTargets(
    memberStore.selectedTargetName
  );
  marchSettingStore.refreshLandingTime(targets);
  // console.log("refreshLandingTime", targets, maxLandingSeconds);
  marchSettingStore.saveData();
};
</script>
