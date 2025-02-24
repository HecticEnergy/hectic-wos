<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      rel="noopener noreferrer"
      rounded="lg"
      variant="text"
      style="cursor: pointer; height: 100%"
      clickable
      @click="$emit('click')"
    >
      <v-sheet
        color="primary"
        rounded="lg"
        height="100%"
        class="d-flex flex-column justify-space-around"
      >
        <v-card-title class="d-flex justify-space-between align-center">
          <v-icon :icon="prependIcon" />
          <label v-show="!!isSelected">
            {{ title }}
          </label>
          <div />
        </v-card-title>
          <v-card-text
            v-if="!!isSelected && !!showDetails"
            class="d-flex flex-column justify-space-around"
            align="center"
          >
            <slot />
          </v-card-text>
      </v-sheet>
      <v-overlay
        :opacity="!!isSelected ? '.01' : '.5'"
        scrim="surface"
        contained
        model-value
        persistent
      />
      <v-overlay
        :opacity="!!isSelected ? '.01' : '.5'"
        scrim="surface"
        contained
        :model-value="!!isHovering"
        persistent
      />
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">
defineSlots<{
  default: void;
}>();
defineProps<{
  title: string;
  prependIcon: string;
  isSelected: boolean;
  showDetails: boolean;
}>();
defineEmits<{
  (event: "click"): void;
}>();
</script>
