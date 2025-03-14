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
        <div v-if="targetMode === 'Single Target'" style="user-select: none">
          Single Target Mode
        </div>
        <div v-else style="user-select: none">Sunfire Castle Mode</div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { TargetMode } from "@/models";

const targetMode = defineModel<TargetMode>({ required: true });
const props = defineProps({
  changeEnabled: {
    type: Boolean,
    default: true,
  },
});

const toggleTargetMode = () => {
  if (!props.changeEnabled) return;
  targetMode.value =
    targetMode.value === "Single Target" ? "Sunfire Castle" : "Single Target";
};
</script>
