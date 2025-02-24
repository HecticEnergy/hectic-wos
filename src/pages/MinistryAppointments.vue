<template>
  <ParentCard>
    <template #topContent>
      <div align="center">
        <h2>Ministry Appointments</h2>
      </div>
    </template>
    <ViewMembers />
    <template #bottomContent>
      <UploadMembers />
    </template>
  </ParentCard>
</template>

<script setup lang="ts">
import UploadMembers from "@/components/ministry-appointments/UploadMembers.vue";
import ViewMembers from "@/components/ministry-appointments/ViewMembers.vue";

import { useMinistryMemberStore } from "@/components/ministry-appointments/ministry-member-store";
import { onMounted } from "vue";

const ministryMemberStore = useMinistryMemberStore();

onMounted(async () => {
  ministryMemberStore.loadData();
});
//
</script>
