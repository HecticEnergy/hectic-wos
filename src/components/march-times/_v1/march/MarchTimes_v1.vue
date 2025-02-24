<template>
  <v-container
    style="height: 95dvh; max-width: 100%"
    class="d-flex flex-column"
  >
    <v-tabs v-model="tabIndex" grow class="flex-0-0">
      <v-tab :value="1"> March Time </v-tab>
      <v-tab :value="3"> Members </v-tab>
      <!-- <v-tab :value="2">Import Member</v-tab> -->
    </v-tabs>
    <v-card class="pb-5 flex-1-1" style="max-height: 95%; overflow-y: auto">
      <v-tabs-window v-model="tabIndex">
        <v-tabs-window-item :value="1">
          <v-card style="height: 80dvh">
            <MarchOutput />
          </v-card>
        </v-tabs-window-item>
        <v-tabs-window-item :value="2">
          <v-card style="height: 80dvh">
            <MemberImport />
          </v-card>
        </v-tabs-window-item>
        <v-tabs-window-item :value="3">
          <v-card style="height: 80dvh">
            <Members />
          </v-card>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useMemberStore } from "@/stores/member-store";
import { useAlertStore } from "@/stores/alert-store";
import * as LocalStorage from "@/services/local-storage";

const memberStore = useMemberStore();
const alertStore = useAlertStore();

const tabIndex = ref<number>(1);
onMounted(() => {
  // NO LONGER USED
  LocalStorage.remove("tutorial-viewed");

  memberStore.loadData();
  if (memberStore.members.length === 0) {
    tabIndex.value = 2;
    alertStore.info("No members found. Please add some members.");
  }
});
</script>
