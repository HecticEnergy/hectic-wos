<template>
  <!-- <v-select
    v-if="memberStore.allTargetNames.length > 1"
    v-model="selectedTargetName"
    :items="memberStore.allTargetNames"
    label="Select Target"
    data-tour="march-output-target-select"
    dense
  /> -->

  <v-item-group
    v-if="memberStore.allTargetNames.length > 1"
    v-model="selectedTargetName"
    class="d-flex align-center no-wrap overflow-x-auto"
    data-tour="march-output-target-select"
    style="max-width: 100%"
  >
    <v-chip
      v-for="targetName in memberStore.allTargetNames"
      :key="targetName"
      :color="targetName === selectedTargetName ? 'primary' : ''"
      :size="targetName === selectedTargetName ? 'default' : 'small'"
      class="flex-1-0"
      :style="{
        // width: targetName === selectedTargetName ? '' : '55px',
        padding: targetName === selectedTargetName ? '' : '5px',
        justifyContent: 'center',
      }"
      @click="selectedTargetName = targetName"
    >
      {{ targetName }}
    </v-chip>
  </v-item-group>
  <v-alert
    v-else-if="memberStore.allTargetNames.length === 0"
    color="warning"
    align="center"
  >
    No Targets Found. <br />
    Please add members with targets.
  </v-alert>
</template>

<script setup lang="ts">
import { useMemberStore } from "@/stores/member-store";
const memberStore = useMemberStore();

const selectedTargetName = defineModel<string>({
  required: true,
});
</script>
