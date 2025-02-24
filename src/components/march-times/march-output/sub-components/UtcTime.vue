<template>
  <span class="opacity-80">{{ label }}: {{ timeLabel }}</span>
</template>

<script setup lang="ts">
import type { Time } from "@/models";
import { formatTime } from "@/services/time-helpers";

const props = defineProps<{
  label?: string;
  time: Time;
}>();

const label = props.label ?? "Current UTC Time";

const getUtcTimeOffset = () => {
  return formatTime(props.time) ?? "00:00:00";
};

const timeLabel = ref<string>(getUtcTimeOffset());
</script>
