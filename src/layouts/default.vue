<template>
  <site-menu :rail="rail" />

  <v-main>
    <v-container
      class="pa-0 ma-0 d-flex flex-column"
      style="height: 100%; max-width: 100%; overflow-y: auto;"
    >
      <router-view />
      <status-snackbar />
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
// import { useTheme } from "vuetify";

const rail = ref(true);

// const theme = useTheme();
// theme.global.name.value =
//   localStorage.theme ||
//   (window.matchMedia &&
//   window.matchMedia("(prefers-color-scheme: dark)").matches
//     ? "customDarkTheme"
//     : "customLightTheme");
</script>
