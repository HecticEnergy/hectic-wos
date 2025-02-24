<template>
  <v-tabs
    v-model="tabIndex"
    grow
  >
    <v-tab :value="1">
      By Launch Time
    </v-tab>
    <v-tab :value="2">
      By Landing Time
    </v-tab>
  </v-tabs>
  <v-container fluid>
    <v-tabs-window v-model="tabIndex">
      <v-tabs-window-item :value="1">
        <MarchOutputLaunchTime />
      </v-tabs-window-item>
      <v-tabs-window-item :value="2">
        <MarchOutputLandingTime />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<script setup lang="ts">

const tabIndex = ref<number>(1);
</script>
