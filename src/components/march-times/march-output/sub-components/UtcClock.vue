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
import { Clock } from "@/services/time-helpers/clock-logic";

const props = defineProps<{
  label?: string;
  offsetMinutes?: number;
  offsetSeconds?: number;
  ignoreSeconds?: boolean;
}>();

const currentUtc = ref<Time>({ hours: 0, minutes: 0, seconds: 0 });
const updateTimerKey = ref<number>(0);

const label = props.label ?? "Current UTC Time";
let clock: Clock;

onMounted(() => {
  clock = new Clock(setClock, getUtcTimeOffset);
});

onUnmounted(() => {
  clock.destroy();
});

const setClock = (time: Time) => {
  currentUtc.value = time;
  updateTimerKey.value++;
};

const getUtcTimeOffset = () =>
  getOffsetUtcTime(
    new Date(),
    props.offsetMinutes ?? 0,
    props.offsetSeconds ?? 0,
    props.ignoreSeconds ?? true
  );
</script>
