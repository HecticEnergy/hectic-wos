<template>
  <UtcTime
    :time-update-key="updateTimerKey"
    :label="label"
    :time="currentUtc"
  />
</template>

<script setup lang="ts">
import type { Time } from "@/models";
import { getOffsetUtcTime } from "@/services/time-helpers";

const props = defineProps<{
  label?: string;
  offsetMinutes?: number;
  offsetSeconds?: number;
  ignoreSeconds?: boolean;
}>();

const label = props.label ?? "Current UTC Time";

const getUtcTimeOffset = () => {
  return getOffsetUtcTime(
    new Date(),
    props.offsetMinutes ?? 0,
    props.offsetSeconds ?? 0,
    props.ignoreSeconds ?? true
  );
};

const currentUtc = ref<Time>({ hours: 0, minutes: 0, seconds: 0 });

const updateTimerKey = ref<number>(0);
let interval: number | undefined | NodeJS.Timeout;

const setClock = () => {
  currentUtc.value = getUtcTimeOffset();
  updateTimerKey.value++
};

const runClock = () => {
  setClock();
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => { setClock(); }, 500);
};

let startTimer: number | undefined | NodeJS.Timeout;
const restartClock = () => {
  setClock();
  setClock();
  if (startTimer) {
    clearTimeout(startTimer);
  }
  //start the clock in line with browser time - keep all clocks in sync
  startTimer = setTimeout(() => {
    runClock();
    startTimer = undefined;
  }, 1010 - new Date().getMilliseconds());
};

onMounted(() => {
  runClock();
  restartClock();
});

onUnmounted(() => {
  if (startTimer) {
    clearTimeout(startTimer);
  }
  if (interval) {
    clearInterval(interval);
  }
});

</script>
