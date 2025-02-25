<template>
  <v-container>
    <v-card title="Snackbar Test" class="ma-1">
      <v-container>
        <v-row>
          <v-col>
            <v-btn color="error" @click="error"> Show Error </v-btn>
          </v-col>
          <v-col>
            <v-btn color="success" @click="success"> Show Success </v-btn>
          </v-col>
          <v-col>
            <v-btn color="info" @click="info"> Show Info </v-btn>
          </v-col>
          <v-col>
            <v-btn color="warning" @click="warning"> Show Warning </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">

import { useAlertStore } from '@/stores/alert-store';
const alertStore = useAlertStore();


const error = () => alertStore.error('error message');
const success = () => alertStore.success('success message');
const info = () => alertStore.info('info message');
const warning = () => alertStore.warning('warning message');

</script>
