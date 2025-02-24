<template>
  <v-expansion-panels class="mb-3">
    <v-expansion-panel>
      <template #title>
        <v-icon
          icon="mdi-information"
          class="mr-2"
        />
        <i>How to use this page</i>
      </template>
      <template #text>
        <slot />
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
defineSlots<{
  default: void;
}>();
</script>
