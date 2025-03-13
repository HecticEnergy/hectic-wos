<template>
  <app-menu title="Hectic WOS">
    <template #appendTopBar>
      <buy-me-beer />
    </template>
  </app-menu>

  <v-main>
    <v-container
      class="pa-0 ma-0 d-flex flex-column"
      style="height: 100%; max-width: 100%; overflow-y: auto"
    >
      <router-view />
      <status-snackbar />
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
//
</script>
