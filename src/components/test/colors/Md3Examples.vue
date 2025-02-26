<template>
  <v-container>
    <a href="https://m3.material.io/styles/color/roles">source</a>
    <v-card>
      <v-card-title>Primary Color</v-card-title>
      <v-card-subtitle>this isn't quite right</v-card-subtitle>
      <v-card-text>
        <p>
          The primary color is the color displayed most frequently across your
          app’s screens and components.
        </p>
        <v-row dense class="pa-5">
          <v-col cols="6" md="3">
            <v-sheet
              rounded
              color="primary"
              class="d-flex align-center justify-center"
              style="width: 100%; height: 100%"
            >
              Primary Container - standout fill color against surface, for key
              components like FAB
            </v-sheet>
          </v-col>
          <v-col cols="6" md="3">
            <v-sheet class="pa-2" color="surface">
              High-emphasis
              <v-chip color="primary" variant="elevated">fills</v-chip>,
              <em>text</em>, and icons
              <v-icon icon="mdi-axe-battle" color="primary" /> against 'surface'
            </v-sheet>
          </v-col>
          <v-col cols="6" md="3">
            <v-sheet
              rounded
              color="primary"
              class="d-flex align-center justify-center"
              style="width: 100%; height: 100%"
            >
              On primary - <em>Text</em> and icons
              <v-icon icon="mdi-axe-battle" color="primary" /> against primary
            </v-sheet>
          </v-col>
          <v-col cols="6" md="3">
            <v-sheet class="ma-2 pa-2" color="primary-darken-1">
              On primary container - Text and icons against primary container
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="pa-5 ma-2">
      <v-card-title>Secondary</v-card-title>
      <v-card-subtitle
        >Use secondary roles for less prominent components in the UI such as
        filter chips</v-card-subtitle
      >
      <v-card-text>
        <p>There are four secondary roles</p>
        <v-row dense>
          <v-col cols="6" md="3">
            Secondary - less prominent fills, text, and icons
            <v-icon icon="mdi-axe-battle" color="secondary" /> against surface
          </v-col>
          <v-col cols="6" md="3">
            On secondary - text and icons against secondary
          </v-col>
          <v-col cols="6" md="3">
            Secondary container - standout fill color against surface, for key
            components like FAB
          </v-col>
          <v-col cols="6" md="3">
            On secondary container - text and icons against secondary container
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="pa-5 ma-2">
      <v-card-title>Tertiary</v-card-title>
      <v-card-subtitle>
        Use tertiary roles for contrasting accents that balance primary and
        secondary colors or bring heightened attention to an element such as an
        input field.
      </v-card-subtitle>
      <v-card-text>
        <p>There are four tertiary roles</p>
        <v-row dense>
          <v-col cols="6" md="3">
            Tertiary - Complementary fills, text, and icons
            <v-icon icon="mdi-axe-battle" color="accent" /> against surface
          </v-col>
          <v-col cols="6" md="3">
            On tertiary - text and icons against tertiary
          </v-col>
          <v-col cols="6" md="3">
            Tertiary container - Complementary container color against surface,
            for components like input fields
          </v-col>
          <v-col cols="6" md="3">
            On tertiary container - text and icons against tertiary container
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="pa-5 ma-2">
      <v-card-title>Error</v-card-title>
      <v-card-subtitle>
        Use error to communicate error states, such as an incorrect password
        entered into a text field.
      </v-card-subtitle>
      <v-card-text>
        <p>There are four error roles</p>
        <v-row dense>
          <v-col cols="6" md="3">
            Error - Attention-grabbing color against surface for fills, icons,
            and text, indicating urgency
          </v-col>
          <v-col cols="6" md="3">
            On error - Text and icons against error
          </v-col>
          <v-col cols="6" md="3">
            Error container = Attention-grabbing fill color against surface
          </v-col>
          <v-col cols="6" md="3">
            On error container - Text and icons against error container
          </v-col>
          <p>
            Error is an example of a static color (it doesn't change in dynamic
            color schemes). Error color roles are made static by default without
            any dynamic color scheme.
          </p>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="pa-5 ma-2">
      <v-card-title>Surface</v-card-title>
      <v-card-subtitle>
        Use surface roles for more neutral backgrounds, and container colors for
        components like cards, sheets, and dialogs
      </v-card-subtitle>
      <v-card-text>
        <p>There are three surface roles</p>
        <v-row dense>
          <v-col cols="12" class="d-flex justify-center">
            Surface - default color for backgrounds
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            On Surface - Text and icons against any surface color
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            On surface variant - Lower-emphasis color for text and icons against
            any surface color
          </v-col>
        </v-row>
        <p>
          There are also five surface container roles named based on their level
          of emphasis:
        </p>
        <v-row dense>
          <v-col cols="12" class="d-flex justify-center">
            Surface Container Lowest - Lowest-emphasis container color
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            Surface Container Low - Low-emphasis container color
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            Surface Container - Default container color
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            Surface Container High - High-emphasis container color
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            Surface Container Highest - Highest-emphasis container color
          </v-col>
        </v-row>
        <p>
          Surface container is the default role, but the others are especially
          helpful for creating hierarchy and nested containers in layouts for
          expanded screens.
        </p>
        <p>
          The most common combination of surface roles uses surface for a
          background area and surface container for navigation area.
        </p>
      </v-card-text>
    </v-card>
    <v-card class="pa-5 ma-2">
      <v-card-title>Inverse Colors</v-card-title>
      <v-card-subtitle>
        Inverse roles are applied selectively to components to achieve colors
        that are the reverse of those in the surrounding UI, creating a
        contrasting effect.
      </v-card-subtitle>
      <v-card-text>
        <v-row dense>
          <v-col cols="12" class="d-flex justify-center">
            Inverse Surface - Background fills for elements which contrast
            against surface
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            Inverse on surface - Text and icons against inverse surface
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            Inverse primary - Actionable elements, such as text buttons, against
            inverse surface
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
// import { mdiAxeBattle } from '@mdi/js';
</script>
