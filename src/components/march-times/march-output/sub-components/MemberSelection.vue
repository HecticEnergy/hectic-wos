<template>
  <!-- TODO: Combobox with chips, select individual members OR groups -->
  <v-select
    v-if="memberStore.groups.length > 0"
    v-model="selectedGroup"
    :items="memberStore.groups"
    label="Select Group"
    dense
  />
</template>

<script setup lang="ts">
import { useMemberStore } from "@/stores/member-store";
const memberStore = useMemberStore();

const selectedGroup = defineModel<string>();
</script>
