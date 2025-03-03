<template>
  <span class="opacity-80"
    >{{ label }}: <span :key="timeUpdateKey">{{ timeLabel }}</span></span
  >
</template>

<script setup lang="ts">
import type { Time } from "@/models";
import { formatTime } from "@/services/time-helpers";

const props = defineProps<{
  label?: string;
  time: Time;
  timeUpdateKey?: string | number;
}>();

const label = props.label ?? "Current UTC Time";

const getUtcTimeOffset = () => {
  return formatTime(props.time) ?? "00:00:00";
};

const timeLabel = computed<string>(() => getUtcTimeOffset());
</script>
