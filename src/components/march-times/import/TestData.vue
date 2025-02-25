<template>
  <v-btn
    v-if="!memberStore.members.length"
    v-bind="$attrs"
    color="secondary"
    @click="addTestData()"
  >
    load test
  </v-btn>
</template>

<script setup lang="ts">
import { testMemberData } from "@/services/test-member-data";
import { useAlertStore } from "@/stores/alert-store";
import { useMemberStore } from "@/stores/member-store";

const memberStore = useMemberStore();
const alertStore = useAlertStore();

const addTestData = () => {
  for (const m of testMemberData) {
    memberStore.add(m);
  }
  memberStore.saveAll();
  alertStore.success("Test Data Loaded");
};
</script>
