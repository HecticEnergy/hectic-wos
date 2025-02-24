<template>
  <v-row dense>
    <v-col cols="12">
      <pre :id="uniqueId">{{ launchTimeOutput }}</pre>
    </v-col>
    <v-col cols="12">
      <v-row
        dense
        class="d-flex justify-center"
      >
        <v-col
          cols="auto"
          shrink
          class="mr-5"
        >
          <v-icon
            icon="mdi-content-copy"
            title="Copy Text"
            @click="copyText"
          />
        </v-col>
        <v-col grow>
          <v-icon
            v-if="!hideRefresh"
            icon="mdi-refresh"
            title="Refresh"
            @click="$emit('refreshOutput')"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
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

defineEmits<{
  refreshOutput: () => void;
}>();

const copyText = () => {
  copyHtmlContent(props.uniqueId);
  alertStore.success("Text Copied to Clipboard");
};
//
</script>
