<template>
  <v-row>
    <v-col cols="12">
      <v-icon icon="mdi-chess-rook" @click="resetTurretTimer" />
      <v-icon icon="mdi-clock" @click="resetTurretTimer" />
      <v-icon
        icon="mdi-refresh"
        title="Restart Turret Timer"
        color="secondary"
        @click="resetTurretTimer"
      />
      <utc-time :time="turretCountdown" label="" />

      <v-icon
        v-if="stopped"
        icon="mdi-play"
        title="Start Turret Timer"
        color="success"
        @click="startClock"
      />
      <v-icon
        v-else
        icon="mdi-stop"
        title="Stop Turret Timer"
        color="error"
        @click="stopClock"
      />
    </v-col>
    <v-col>
      <v-row class="align-center">
        <v-col cols="auto"> Last Turret Hit: </v-col>
        <v-col cols="12">
          <v-icon
            icon="mdi-minus"
            size="small"
            color="secondary"
            class="ma-0 pa-0"
            @click="decreaseTurretTime"
          />
          <utc-time :time="turretLastHit" label="" />
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

const model = defineModel<number | undefined>({ required: true });

const emit = defineEmits<{
  (e: "update:model-value", value: number): void;
}>();

onMounted(() => {
  setup(model.value);
});

watch(model, (value) => {
  setup(value);
});

//Thats done.. now hit on the second with turret Offset
const stopped = ref(true);
const turretLastHit = ref({ hours: 0, minutes: 0, seconds: 0 });
const turretCountdown = ref({ hours: 0, minutes: 0, seconds: 0 });

let lastSeconds = turretLastHit.value.seconds;
watch(turretLastHit, () => {
  const marchLandSeconds = turretLastHit.value.seconds;
  if (marchLandSeconds !== lastSeconds) {
    lastSeconds = marchLandSeconds;
    emit("update:model-value", marchLandSeconds);
    // console.log("watch: marchLandSeconds", marchLandSeconds);
  }
});

let lastModelValue = 0 as number | undefined;
const setup = (value: number | undefined) => {
  if (!value || value === lastModelValue) {
    return;
  }
  lastModelValue = value;

  const utcTime = getUtcTime(new Date());
  const utcSeconds = getSecondsFromTime(utcTime);
  let lastHitSeconds = getSecondsFromTime({
    hours: utcTime.hours,
    minutes: utcTime.minutes,
    seconds: value,
  });

  if (lastHitSeconds > utcSeconds) {
    lastHitSeconds -= 60;
  }

  if (getSecondsFromTime(turretLastHit.value) === lastHitSeconds) {
    return;
  }

  const lastHitTime = getTimeFromSeconds(lastHitSeconds);
  turretLastHit.value = lastHitTime;

  // console.log(
  //   "watch: value, lastHitTime, utcTime",
  //   value,
  //   lastHitTime,
  //   utcTime
  // );

  let countdown = utcSeconds - lastHitSeconds;
  if (countdown < 0) countdown += 60;

  turretCountdown.value = getTimeFromSeconds(countdown);
};

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
  setup(model.value);
  clock = new Clock(setClock, getTime);
  stopped.value = false;
};

const stopClock = () => {
  if (!!clock) clock.destroy();
  stopped.value = true;
};

onUnmounted(() => {
  if (!!clock) clock.destroy();
});
</script>
