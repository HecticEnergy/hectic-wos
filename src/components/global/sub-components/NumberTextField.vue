<template>
  <v-text-field
    v-bind="$attrs"
    v-model="model"
    type="number"
    inputmode="numeric"
    pattern="[0-9]*"
    @update:model-value="updateModel"
    @focus="$event.target.select()"
  />
</template>
<script setup lang="ts">
const model = defineModel<number>();
const emits = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const updateModel = (value: string) => {
  const numberValue = Number(value);
  if (!isNaN(numberValue)) {
    model.value = numberValue;
    emits("update:modelValue", numberValue);
  }
};
</script>
