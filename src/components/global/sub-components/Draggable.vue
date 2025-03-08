<template>
  <vue-draggable v-bind="$attrs" v-model="model" :handle="handle" element="span">
    <template #item="{ element }">
      <span>
        <slot name="item" v-bind="{ element }"></slot>
      </span>
    </template>
  </vue-draggable>
</template>

<script setup lang="ts" generic="T">
import vueDraggable from "vuedraggable";

const model = defineModel<T[]>({ required: true });
defineProps<{ handle?: string }>();

defineSlots<{
  item(props: { element: T }): void;
}>();
</script>
