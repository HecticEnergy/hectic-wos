<template>
  <v-text-field
    v-bind="$attrs"
    v-model="marchTime"
    label="March Time"
    width="105px"
    inputmode="numeric"
    :error-messages="marchTimeError"
    hide-details="auto"
    @blur="updateModel(marchTime)"
    @focus="$event.target.select()"
  />
</template>

<script setup lang="ts">
import type { Time } from "@/models";
import {
  getSecondsFromTime,
  getTimeFromSeconds,
} from "@/services/time-helpers";
import { formatTime } from "@/services/time-helpers/time-formatters";
import { parseTime } from "./time-text-box-auto-format-logic";

type TimeModel = {
  id?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

const model = defineModel<TimeModel>({ required: true });

const props = defineProps({
  includeHours: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits<{
  (e: "update:model-value", value: TimeModel): void;
}>();

onMounted(() => {
  lastValidValue = "" + marchTime.value;
  // updateModel(formatMarchTime(), false);
});
const formatMarchTime = () => {
  return formatTime({
    hours: props.includeHours ? model.value.hours : undefined,
    minutes: model.value.minutes,
    seconds: model.value.seconds ?? 0,
  } as Time)!;
};

const marchTime = ref<string>(formatMarchTime());
const marchTimeError = ref<string | null>(null);
let lastValidValue: string;

const updateModel = (value: string, save: boolean = true) => {
  try {
    const time = parseTime(value, lastValidValue);
    if (!time) throw new Error("Invalid time format");

    const timeFromSec = getTimeFromSeconds(getSecondsFromTime(time));
    lastValidValue = "" + marchTime.value;
    marchTime.value = formatMarchTime();

    model.value.minutes = timeFromSec.minutes;
    model.value.seconds = timeFromSec.seconds;

    if (save) emit("update:model-value", model.value);
    marchTimeError.value = null;
  } catch (e) {
    console.log("error", e);
    if (e instanceof Error) {
      marchTimeError.value = e.message;
    } else {
      marchTimeError.value = "An error occurred";
    }
  }
};
</script>
