<template>
  <div v-if="alertStore.getMessages().length > 0">
    <v-snackbar
      v-for="alert in alertStore.getMessages()"
      :key="alert.id"
      v-model="alert.show"
      transition="fade"
      location="top"
      :color="alert.severity"
      :timeout="alertStore.getTimeout(alert.id)"
      elevation-24
    >
      <v-row>
        <v-col>
          <strong>{{ alert.severity }}:</strong> {{ alert.message }}
        </v-col>
        <v-col cols="auto">
          <v-icon @click="() => alertStore.hide(alert.id)">
            mdi-close
          </v-icon>
        </v-col>
      </v-row>
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { useAlertStore } from "@/stores/alert-store";

const alertStore = useAlertStore();
</script>
