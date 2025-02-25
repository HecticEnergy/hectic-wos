<template>
  <v-container>
    <v-card>
      <v-card-title>Material Design 2 Color Palette</v-card-title>
      <v-card-subtitle
        >sources 
        <a
          href="https://m2.material.io/design/color/the-color-system.html#color-theme-creation"
        >
          m2.material.io
        </a>
        <a
          href="https://graphicmama.com/blog/material-design/"
        >
          graphicmana
        </a>
      </v-card-subtitle>
      <v-card-text>
        <v-row v-for="item in items" :key="item.title" dense>
          <v-col
            v-for="(color, idx) in item.colors"
            :key="`${color.name}-${idx}`"
            :cols="`${item.colors.length / 12}`"
            :class="`mb-${item.marginBottom}`"
          >
            <v-sheet
              class="pa-4 d-flex flex-column"
              :color="color.name"
              rounded
              width="100%"
              :style="`height: ${color.height}`"
            >
              <v-row>
                <v-col cols="12">
                  <h3>{{ color.title }}</h3>
                </v-col>
              </v-row>
              <v-row dense class="align-end">
                <v-col cols="12" class="d-flex align-center justify-center">
                  <v-row>
                    <v-col cols="auto">
                      <v-tooltip :text="color.info" width="15em">
                        <template #activator="{ props }">
                          <v-chip v-bind="props" style="cursor: help">
                            {{ idx + 1 }}
                          </v-chip>
                        </template>
                      </v-tooltip>
                    </v-col>
                    <v-col class="d-flex align-center justify-end">
                      {{ color.value?.toUpperCase() ?? 'undefined'}}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import { useTheme } from 'vuetify';
const theme = useTheme();

class Md2Color {
  title: string;
  name: string;
  value: string;
  info: string;
  height: string = '100px';
  constructor(
    title: string,
    name: string,
    value: string,
    height: string,
    info: string
  ) {
    this.title = title;
    this.name = name;
    this.value = value;
    this.height = height;
    this.info = info;
  }
}

const items = ref([
  {
    title: 'Primary Colors',
    marginBottom: 5,
    colors: [
      new Md2Color(
        'Primary',
        'primary',
        theme.current.value.colors.primary,
        '13em',
        "Primary colors will appear most of the time on your designs. Ensure they are bold and represent your brand in the best way possible. If you have large images, you should extract your primary colors from the picture, to achieve design consistency."
      ),
      new Md2Color(
        'Primary Darken 1 (Variant?)',
        'primary-darken-1',
        theme.current.value.colors['primary-darken-1'],
        '13em',
        'Your primary color can be used to make a color theme for your app, including dark and light primary color variants.'
      ),
      new Md2Color(
        'Secondary',
        'secondary',
        theme.current.value.colors.secondary,
        '13em',
        'Secondary colors are a great choice for progress bars, highlighting texts, etc. There should be a direct correlation between primary colors and secondary colors. A good practice is to use a secondary color that is between the primary colors, especially after the introduction of dark themes.'
      ),
      new Md2Color(
        'Secondary Darken 1 (Variant?)',
        'secondary-darken-1',
        theme.current.value.colors['secondary-darken-1'],
        '13em',
        'Just like the primary color, your secondary color can have dark and light variants. A color theme can use your primary color, secondary color, and dark and light variants of each color.'
      ),
    ],
  },
  {
    title: 'Background Colors',
    marginBottom: 1,
    colors: [
      new Md2Color(
        'Background',
        'background',
        theme.current.value.colors.background,
        '',
        'The background color appears behind scrollable content.'
      ),
      new Md2Color(
        'Surface',
        'surface',
        theme.current.value.colors.surface,
        '',
        'The surface color appears on components like cards, sheets, and menus.'
      ),
    ],
  },

  {
    title: 'Background Variants',
    marginBottom: 5,
    colors: [
      new Md2Color(
        'Surface Bright',
        'surface-bright',
        theme.current.value.colors['surface-bright'],
        '',
        'The surface color appears on components like cards, sheets, and menus.'
      ),
      new Md2Color(
        'Surface Variant',
        'surface-variant',
        theme.current.value.colors['surface-variant'],
        '',
        'The surface color appears on components like cards, sheets, and menus.'
      ),
    ],
  },

  {
    title: 'Status Colors',
    marginBottom: 5,
    colors: [
      new Md2Color(
        'Error',
        'error',
        theme.current.value.colors.error,
        '',
        'Error color roles are made static by default without any dynamic color scheme.'
      ),
      new Md2Color(
        'Warning',
        'warning',
        theme.current.value.colors.warning,
        '',
        'Warning color roles are made static by default without any dynamic color scheme.'
      ),
      new Md2Color(
        'Info',
        'info',
        theme.current.value.colors.info,
        '',
        'Info color roles are made static by default without any dynamic color scheme.'
      ),
      new Md2Color(
        'Success',
        'success',
        theme.current.value.colors.success,
        '',
        'Success color roles are made static by default without any dynamic color scheme.'
      ),
    ],
  },
  {
    title: 'On Colors',
    marginBottom: 5,
    colors: [
      new Md2Color(
        'On Background',
        'onBackground',
        theme.current.value.colors.onBackground,
        '',
        'Text and icons against the background color.'
      ),
      new Md2Color(
        'On Surface',
        'onSurface',
        theme.current.value.colors.onSurface,
        '',
        'Text and icons against the surface color.'
      ),
      new Md2Color(
        'On Primary',
        'onPrimary',
        theme.current.value.colors.onPrimary,
        '',
        'Text and icons against the primary color.'
      ),
      new Md2Color(
        'On Secondary',
        'onSecondary',
        theme.current.value.colors.onSecondary,
        '',
        'Text and icons against the secondary color.'
      ),
    ],
  }
]);
</script>
