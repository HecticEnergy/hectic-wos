<template>
  <div>
    <v-app-bar class="pt-5">
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-select
              v-model="selectedTheme"
              :items="themes"
              label="Theme"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <div  style="margin-top: 3em; margin-bottom: 3em;">
      <ColorsList />
      <Md2Example />
      <!-- Md3Examples needs work -->
      <!-- <Md3Examples /> -->
      <AlertTest />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';
const theme = useTheme();

const selectedTheme = theme.global.name;
const themes = ['light', 'dark'];
</script>
