<template>
  <parent-card>
    <draggable-chips />
  </parent-card>
</template>

<script setup lang="ts">
import { useMemberStore } from "@/stores/member-store";

const memberStore = useMemberStore();

onBeforeMount(() => {
  memberStore.loadData();
});
</script>
