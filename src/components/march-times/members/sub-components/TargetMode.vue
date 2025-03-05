<template>
  <div class="cursor-pointer" @click="toggleTargetMode">
    <v-row align="center">
      <v-col cols="auto">
        <v-icon
          v-if="targetMode === 'Single Target'"
          color="secondary"
          icon="mdi-target"
          size="large"
          title="Single Target Mode"
        />
        <v-icon
          v-else
          color="secondary"
          icon="mdi-castle"
          size="large"
          title="Sunfire Castle Mode"
        />
      </v-col>
      <v-col cols="auto">
        <v-label v-if="targetMode === 'Single Target'">
          Single Target Mode
        </v-label>
        <v-label v-else> Sunfire Castle Mode </v-label>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { TargetMode } from "@/models";

const targetMode = defineModel<TargetMode>({ required: true });

const toggleTargetMode = () => {
  targetMode.value =
    targetMode.value === "Single Target" ? "Sunfire Castle" : "Single Target";
};
</script>
