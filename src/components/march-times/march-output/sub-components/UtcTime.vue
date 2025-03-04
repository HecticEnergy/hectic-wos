<template>
  <span class="opacity-80">{{ label }}: {{ timeLabel }}</span>
</template>

<script setup lang="ts">
import { cTime } from "@/models";
import { formatTime } from "@/services/time-helpers";

const props = defineProps({
  time: {
    type: cTime,
    required: true,
  },
  label: {
    type: String,
    required: false,
    default: "Current UTC Time",
  },
});

const getUtcTimeOffset = () => {
  return formatTime(props.time) ?? "00:00:00";
};

const timeLabel = ref<string>(getUtcTimeOffset());
</script>
