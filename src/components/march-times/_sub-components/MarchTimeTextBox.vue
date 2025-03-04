<template>
  <v-text-field
    v-model="marchTime"
    label="March Time"
    width="105px"
    inputmode="numeric"
    @blur="updateModel"
    @focus="$event.target.select()"
  />
</template>

<script setup lang="ts">
import {
  getSecondsFromTime,
  getTimeFromSeconds,
} from "@/services/time-helpers";
import { formatTimeMS } from "@/services/time-helpers/time-formatters";

const emit = defineEmits<{
  (e: "update:model-value", value: TimeModel): void;
}>();

type TimeModel = {
  id?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};
const model = defineModel<TimeModel>({ required: true });
onMounted(() => {
  marchTime.value = formatTimeMS(model.value.minutes, model.value.seconds ?? 0);
  lastValidValue = "" + marchTime.value;
  updateModel();
});

// onUpdated(() => {
//   marchTime.value = formatTimeMS(model.value.minutes, model.value.seconds ?? 0);
//   updateModel();
// });

let lastValidValue: string;
const marchTime = ref<string | null>(null);

const updateModel = () => {
  //assume that marchTime is MMSS or MM:SS or SS
  //   console.log(
  //     "updateModel",
  //     marchTime.value,
  //     Number.isNaN(Number.parseInt(marchTime.value ?? ""))
  //   );
  if (marchTime.value === null) return;
  if (Number.isNaN(Number.parseInt(marchTime.value))) {
    marchTime.value = lastValidValue;
    throw new Error("Invalid time format, numeric values only");
  }
  const time = { hours: 0, minutes: 0, seconds: 0 };
  const marchTimeValue = marchTime.value
    .replace(/[^0-9:]*/g, "")
    .padStart(4, "0");
  if (marchTimeValue.length > 2) {
    if (marchTimeValue.includes(":")) {
      const parts = marchTimeValue.split(":");
      if (parts.length > 2) {
        throw new Error("Invalid time format only supports MM:SS");
      }
      time.minutes = parseInt(parts[0]);
      time.seconds = parseInt(parts[1]);
    } else {
      time.minutes = parseInt(marchTimeValue.substring(0, 2));
      time.seconds = parseInt(marchTimeValue.substring(2, 4));
    }
  }

  const timeFromSec = getTimeFromSeconds(getSecondsFromTime(time));
  marchTime.value = formatTimeMS(timeFromSec.minutes, timeFromSec.seconds);
  lastValidValue = "" + marchTime.value;
  model.value.minutes = time.minutes;
  model.value.seconds = time.seconds;
  emit("update:model-value", model.value);
  //   console.log("updateModel", marchTime.value, model.value);
};
</script>
