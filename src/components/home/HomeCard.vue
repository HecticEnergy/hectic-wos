<template>
  <v-card rounded class="ma-5 pa-5" style="filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5))" >
    <v-card-title>
      <v-row class="d-flex">
        <v-col cols="auto" shrink class="mr-5">
          <slot name="title-icon">
            <v-icon
              :icon="icon"
              color="secondary"
              @click="$emit('icon-click')"
            />
          </slot>
        </v-col>
        <v-col grow> {{ title }}</v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <div class="mt-5">
        <slot name="prepend"></slot>
      </div>
      <slot>
        <span v-for="line in textLines" :key="line">
          <p class="mt-5">{{ line }}</p>
        </span>
      </slot>
      <div class="mt-5">
        <slot name="append"></slot>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  textLines: {
    type: Array<string>,
    default: [],
  },
});

defineEmits<{
  (e: "icon-click"): void;
}>();

defineSlots<{
  "title-icon": void;
  prepend: void;
  default: void;
  append: void;
}>();
</script>
