<template>
  <v-dialog v-model="model" max-width="400" v-bind="$attrs">
    <v-card :title="title" class="pa-2">
      <v-card-text>
        <slot> {{ text ?? "" }}</slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="cancel">{{ cancelText }}</v-btn>
        <v-btn color="primary" @click="confirm">{{ confirmText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({ required: true });

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "confirm"): void;
}>();

const {
  cancelLabel: cancelText = "Cancel",
  confirmLabel: confirmText = "Confirm",
} = defineProps<{
  title: string;
  text?: string;
  cancelLabel?: string;
  confirmLabel?: string;
}>();

defineSlots<{
  default: void;
}>();

const cancel = () => {
  model.value = false;
  emit("cancel");
};
const confirm = () => {
  model.value = false;
  emit("confirm");
};
</script>
