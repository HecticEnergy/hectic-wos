<template>
  <v-select
    v-if="memberStore.allTargetNames.length > 1"
    v-model="selectedTargetName"
    :items="memberStore.allTargetNames"
    label="Select Target"
    data-tour="march-output-target-select"
    dense
  />
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
