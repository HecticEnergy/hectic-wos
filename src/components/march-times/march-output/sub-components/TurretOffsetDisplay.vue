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
      <v-row class="align-center">
        <v-col cols="auto"> Last Turret Hit: </v-col>
        <v-col cols="auto">
          <v-icon
            icon="mdi-minus"
            size="small"
            color="secondary"
            class="ma-0 pa-0"
            @click="decreaseTurretTime"
          />
        </v-col>
        <v-col cols="auto">
          <utc-time :time="turretLastHit" label="" />
        </v-col>
        <v-col cols="auto">
          <v-icon
            icon="mdi-plus"
            size="small"
            color="secondary"
            class="ma-0 pa-0"
            @click="increaseTurretTime"
          />
        </v-col>
      </v-row>
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

const emit = defineEmits<{
  (e: "update:march-land-seconds", value: number): void;
}>();

//Thats done.. now hit on the second with turret Offset
const turretLastHit = ref({ hours: 0, minutes: 0, seconds: 0 });
const turretCountdown = ref({ hours: 0, minutes: 0, seconds: 0 });

let lastSeconds = turretCountdown.value.seconds;
watch(turretCountdown, () => {
  const marchLandSeconds = turretCountdown.value.seconds;
  if (marchLandSeconds !== lastSeconds) {
    emit("update:march-land-seconds", marchLandSeconds);
    lastSeconds = marchLandSeconds;
  }
});

// Store Turret Time in local storage

const resetTurretTimer = () => {
  if (!clock) startClock();

  const time = getUtcTime(new Date());
  turretLastHit.value = time;
  turretCountdown.value = { hours: 0, minutes: 0, seconds: 59 };
};

const setClock = (time: Time) => {
  turretCountdown.value = time;
};
const getTime = () => {
  const seconds = getSecondsFromTime(turretCountdown.value) - 1;
  let nextHitSeconds = getSecondsFromTime(turretLastHit.value) + 60;
  if (seconds <= 0) {
    turretLastHit.value = getTimeFromSeconds(nextHitSeconds);
    nextHitSeconds += 60;
  }
  const utcTime = getUtcTime(new Date());
  const diff = nextHitSeconds - getSecondsFromTime(utcTime);
  return getTimeFromSeconds(diff);
};

const decreaseTurretTime = () => {
  const seconds = getSecondsFromTime(turretLastHit.value) - 1;
  turretLastHit.value = getTimeFromSeconds(seconds);
};

const increaseTurretTime = () => {
  const seconds = getSecondsFromTime(turretLastHit.value) + 1;
  turretLastHit.value = getTimeFromSeconds(seconds);
};

let clock: Clock;

const startClock = () => {
  if (!!clock) clock.destroy();
  clock = new Clock(setClock, getTime);
};

onUnmounted(() => {
  if (!!clock) clock.destroy();
});
</script>
