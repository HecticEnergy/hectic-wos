<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import { useAlertStore } from "@/stores/alert-store";
const alertStore = useAlertStore();
const isDev = document.location.hostname === "localhost";

onMounted(() => {
  if (!isDev) {
    console.log("Development mode");
    onErrorCaptured((err) => {
      console.error(err);
      alertStore.error("An error occurred: " + err.message);
    });
  }
});
</script>

<style>
html {
  overflow-y: hidden !important;
}
html,
body {
  height: 100%;
  min-height: 100%;
  margin: 0;
  touch-action: manipulation;
}
</style>
