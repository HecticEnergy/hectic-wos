<template>
  <v-dialog
    v-model="dialogOpenComputed"
    persistent
  >
    <v-sheet class="pa-2">
      <v-container
        class="d-flex flex-row align-start justify-center"
        style="min-width: 100%"
      >
        <v-row dense>
          <v-col cols="10">
            <h1>{{ title }}</h1>
          </v-col>
          <v-col
            cols="2"
            class="d-flex justify-end"
          >
            <v-btn
              icon="mdi-close"
              flat
              @click="close"
            />
          </v-col>
          <v-col cols="12">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  title: string;
  dialogOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "update:dialogOpen", value: boolean): void;
}>();

const dialogOpenComputed = computed({
  get: () => props.dialogOpen,
  set: (newValue: boolean) => {
    if (!newValue) {
      emit("close");
    }
    emit("update:dialogOpen", newValue);
  },
});

const close = () => {
  dialogOpenComputed.value = false;
};
</script>
