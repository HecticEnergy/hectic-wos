<template>
  <v-card
    class="py-1 position-absolute bottom-0"
    width="96%"
    rounded
  >
    <slot />
  </v-card>
</template>

<script setup lang="ts">
defineSlots<{
  default: void;
}>();
</script>
