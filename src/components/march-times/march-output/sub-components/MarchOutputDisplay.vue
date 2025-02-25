<template>
  <v-card class="pa-2" rounded color="background" data-tour="march-output-display">
    <v-row dense>
      <v-col cols="12">
        <pre :id="uniqueId">{{ launchTimeOutput }}</pre>
      </v-col>
      <v-col cols="12">
        <v-row dense class="d-flex justify-center">
          <v-col grow></v-col>
          <v-col cols="auto" shrink class="pr-3">
            <v-icon
              v-if="!hideRefresh"
              icon="mdi-refresh"
              title="Refresh"
              class="hover-cursor"
              data-tour="march-output-display-refresh"
              @click="refresh"
            />
          </v-col>
          <v-col cols="auto" shrink>
            <v-icon
              icon="mdi-content-copy"
              title="Copy Text"
              class="hover-cursor"
              data-tour="march-output-display-copy"
              @click="copyText"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-overlay
        v-model="showOverlay"
        :opacity="0.5"
        scrim="surface"
        contained
        persistent
      />
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { copyHtmlContent } from "@/services/html-helpers";
import { useAlertStore } from "@/stores/alert-store";
const alertStore = useAlertStore();

const props = defineProps<{
  launchTimeOutput: string;
  uniqueId: string;
  hideRefresh?: boolean;
}>();

const showOverlay = ref(false);

const emit = defineEmits<{
  (e: "refreshOutput"): void;
}>();

const copyText = () => {
  copyHtmlContent(props.uniqueId);
  alertStore.success("Text Copied to Clipboard");
};

const refresh = () => {
  showOverlay.value = true;
  const overlayTimeout = setTimeout(() => {
    emit("refreshOutput");
    showOverlay.value = false;
    clearTimeout(overlayTimeout);
  }, 250);
};
</script>
