<template>
  <v-row>
    <v-col cols="auto">
      <v-btn
        prepend-icon="mdi-chess-rook"
        title="Reset Turret Timer"
        color="secondary"
        text="Reset Timer"
      />
    </v-col>
    <v-col>
      <v-row class="d-flex flex-column">
        <v-col align="right">
          <utc-time :time="turretOffset" label="Turret Offset" />
        </v-col>
        <v-col align="right">
          <utc-time :time="turretCountdown" label="Turret Count Down" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const turretOffset = ref({ hours: 0, minutes: 0, seconds: 0 });
const turretCountdown = ref({ hours: 0, minutes: 0, seconds: 0 });

</script>
