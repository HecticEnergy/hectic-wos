<template>
  <v-row>
    <v-col cols="12">
      <v-icon icon="mdi-chess-rook" />
      <v-icon icon="mdi-clock" />
      <utc-time :time="turretCountdown" label="" />
      <v-icon
        icon="mdi-refresh"
        title="Restart Turret Timer"
        color="secondary"
        @click="resetTurretTimer"
      />
    </v-col>
    <v-col>
      <utc-time :time="turretOffset" label="Turret Offset" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { Time } from "@/models";
import { Clock } from "@/services/time-helpers/clock-logic";
import {
  getSecondsFromTime,
  getTimeFromSeconds,
  getUtcTime,
} from "@/services/time-helpers";

//Thats done.. now hit on the second with turret Offset
const turretOffset = ref({ hours: 0, minutes: 0, seconds: 0 });
const turretCountdown = ref({ hours: 0, minutes: 0, seconds: 0 });

// Store Turret Time in local storage

const resetTurretTimer = () => {
  const time = getUtcTime(new Date());
  turretOffset.value = { hours: 0, minutes: 0, seconds: time.seconds };
  turretCountdown.value = { hours: 0, minutes: 1, seconds: 0 };
  // clock.restartClock();
};

const setClock = (time: Time) => {
  turretCountdown.value = time;
};
const getTime = () => {
  const seconds = getSecondsFromTime(turretCountdown.value);
  if (seconds <= 0) return { hours: 0, minutes: 1, seconds: 0 };
  return getTimeFromSeconds(seconds - 1);
};

const clock = new Clock(setClock, getTime);

onUnmounted(() => {
  clock.destroy();
});
</script>
