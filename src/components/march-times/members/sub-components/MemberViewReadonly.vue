<template>
  <v-row>
    <v-col cols="auto" class="my-2" align="center">
      <h2>
        {{ member.name }}
        <h2 v-if="!member.name" class="opacity-50 italic">Empty Member Name</h2>
      </h2>
    </v-col>
    <v-col align="end">
      <h2>
        <span class="opacity-50" style="font-style: italic">{{ title }}</span>
      </h2>
    </v-col>
    <v-col cols="12">
      <v-row v-for="(target, idx) in member.targetTimes" :key="idx">
        <v-col cols="6">
          <v-label>{{ target.targetName }}</v-label>
        </v-col>
        <v-col cols="6" align="end">
          <v-label
            :class="diffRows.includes(target.targetName) ? 'different' : ''"
          >
            {{ formatTimeMS(target.minutes, target.seconds) }}
          </v-label>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { Member } from "@/models";
import { formatTimeMS } from "@/services/time-helpers/time-formatters";

const member = defineModel<Member>({ required: true });
defineProps({
  title: { type: String, required: false, default: "" },
  diffRows: { type: Array, required: false, default: () => [] },
});
</script>

<style scoped>
.different {
  color: green;
}
</style>
