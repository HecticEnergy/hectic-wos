<template>
  <v-dialog
    v-model="showDialog"
    transition="dialog-bottom-transition"
    fullscreen
  >
    <!-- :fullscreen="smAndDown" -->
    <v-card>
      <v-toolbar density="compact">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-btn
          icon="mdi-close"
          data-tour="dialog-full-screen-close"
          @click="close"
        />
      </v-toolbar>
      <slot />
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
// import { useDisplay } from "vuetify";

// const { smAndDown } = useDisplay();

const showDialog = defineModel<boolean>({ required: true });
defineProps<{
  title: string;
  fullScreenMode?: "always" | "smAndDown";
}>();
const emit = defineEmits<{
  (e: "close"): void;
}>();
defineSlots<{
  default: void;
}>();

const close = () => {
  showDialog.value = false;
  emit("close");
};
</script>
