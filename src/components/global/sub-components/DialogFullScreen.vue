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
          icon
          @click="
            () => {
              showDialog = false;
              $emit('close');
            }
          "
        >
          <v-icon data-tour="dialog-full-screen-close">mdi-close</v-icon>
        </v-btn>
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
defineEmits<{
  (e: "close"): void;
}>();
defineSlots<{
  default: void;
}>();
</script>
