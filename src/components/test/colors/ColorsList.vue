<template>
  <v-container>
    <v-card>
      <v-card-title>Color List</v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col v-for="color in colors" :key="`${color[1]}`" cols="6" md="3">
            <v-card
              class="d-flex justify-center align-center"
              :style="{ backgroundColor: color[1], color: color[2] }"
            >
              <v-card-text>{{ color[0] }} </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { CustomColors } from './colors-logic';

import { useTheme } from 'vuetify';
const theme = useTheme();


const selectedTheme = theme.global.name;
// const themes = ['light', 'dark'];

watch(selectedTheme, () => {
  console.log('selectedTheme', selectedTheme.value);
  theme.global.name.value = selectedTheme.value ?? 'light';
  updateColors();
});

const customColors = ref<CustomColors>(new CustomColors(theme.current.value));

const colors = ref<[string, string, string?][]>([]);
const updateColors = () => {
  customColors.value = new CustomColors(theme.current.value);

  const localColors = customColors.value;

  console.log('background', localColors.background);

  colors.value = [
    [
      'background, onBackground',
      localColors.background,
      localColors.onBackground,
    ],
    ['background, default', localColors.background],
    ['surface, onSurface', localColors.surface, localColors.onSurface],
    ['surface, default', localColors.surface],
    ['primary', localColors.primary],
    ['surface, onPrimary', localColors.surface, localColors.onPrimary],
    ['secondary, onSecondary', localColors.secondary, localColors.onSecondary],
    ['accent, default', localColors.accent],
    ['error, onError', localColors.error, localColors.onError],
    ['warning, onWarning', localColors.warning, localColors.onWarning],
    ['info, onInfo', localColors.info, localColors.onInfo],
    ['success, onSuccess', localColors.success, localColors.onSuccess],
    [
      'surface-bright, onSurface',
      localColors.surfaceBright,
      localColors.onSurface,
    ],
    [
      'surface-variant, onSurfaceVariant',
      localColors.surfaceVariant,
      localColors.onSurfaceVariant,
    ],
    [
      'primary-darken-1, onPrimary',
      localColors.primaryDarken1,
      localColors.onPrimary,
    ],
    [
      'secondary-darken-1, onSecondary',
      localColors.secondaryDarken1,
      localColors.onSecondary,
    ],
    [
      'primary-lighten-1, onPrimary',
      localColors.primaryLighten1,
      localColors.onPrimary,
    ],
    [
      'secondary-lighten-1, onSecondary',
      localColors.secondaryLighten1,
      localColors.onSecondary,
    ],
  ];
};

updateColors();
</script>
