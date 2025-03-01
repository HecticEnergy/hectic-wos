<template>
  <v-row dense>
    <v-col
      v-if="!!label"
      cols="12"
    >
      {{ label }}
      <v-icon
        v-if="!!labelAppendIcon"
        :icon="labelAppendIcon"
        size="small"
        class="ml-2"
        @click="() => emits('labelAppendAction')"
      />
    </v-col>
    <v-col
      v-for="field in fields"
      :key="field.key"
      cols="auto"
    >
      <NumberTextField
        v-if="field.value !== undefined"
        v-model="field.value"
        :label="field.label"
        width="80"
        @change="updateModel"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
type TimeModel = {
  id?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

const model = defineModel<TimeModel>({ required: true });
defineProps<{
  label?: string;
  labelAppendIcon?: string;
}>();

const emits = defineEmits<{
  (e: "labelAppendAction"): void;
}>();

onMounted(() => {
  setFields();
});
onUpdated(() => {
  setFields();
});

const fields = ref<{ label: string; value: number; key: string }[]>([]);

const getKey = (prefix: string) => {
  return `${prefix}-${Math.random().toString(36).substring(7)}`;
};

const updateModel = () => {
  const hours = fields.value.find((f) => f.label === "Hours")?.value;
  const minutes = fields.value.find((f) => f.label === "Minutes")?.value;
  const seconds = fields.value.find((f) => f.label === "Seconds")?.value;
  const modelProps = JSON.parse(JSON.stringify(model.value));
  model.value = { ...modelProps, hours, minutes, seconds };
};

const setFields = () => {
  fields.value = [];
  if (model.value.hours !== undefined) {
    fields.value.push({
      label: "Hours",
      value: model.value.hours,
      key: getKey("hours"),
    });
  }
  if (model.value.minutes !== undefined) {
    fields.value.push({
      label: "Minutes",
      value: model.value.minutes,
      key: getKey("minutes"),
    });
  }
  if (model.value.seconds !== undefined) {
    fields.value.push({
      label: "Seconds",
      value: model.value.seconds,
      key: getKey("seconds"),
    });
  }
};

//
</script>
