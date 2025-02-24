<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import { useAlertStore } from "@/stores/alert-store";
const alertStore = useAlertStore();

onMounted(() => {
  onErrorCaptured((err) => {
    console.error(err);
    alertStore.error("An error occurred: " + err.message);
  });
});
</script>

<style>
html {
  overflow-y: hidden !important;
}
html, body {
  height: 100%;
  min-height: 100%;
  margin: 0;
}
</style>
