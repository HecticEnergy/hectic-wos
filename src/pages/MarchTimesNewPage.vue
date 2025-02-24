<template>
  <v-row dense class="ma-0">
    <v-col>
      <MarchTimes />
    </v-col>
    <v-col class="d-none d-md-block">
      <MarchSettingsEdit />
    </v-col>
    <v-col class="d-none d-lg-block">
      <v-card height="98%" class="ma-0 pa-0" rounded>
      <Members />
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">

onMounted(() => {
  //
});
</script>
