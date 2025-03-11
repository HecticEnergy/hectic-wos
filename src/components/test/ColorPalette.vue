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
    <div style="margin-top: 3em; margin-bottom: 3em">
      <ColorsList />
      <Md2Example />
      <!-- Md3Examples needs work -->
      <!-- <Md3Examples /> -->
      <AlertTest />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ThemeSelect, themeNames } from "@/services/vuetify-themes";

const themeSelect = new ThemeSelect();

const selectedTheme = ref(themeSelect.getTheme());

watch(selectedTheme, themeSelect.setTheme);

const themes = themeNames;
</script>
