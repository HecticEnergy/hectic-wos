<template>
  <v-row>
    <v-col cols="12">
      <target-mode v-model="member.targetType" :change-enabled="false" />
    </v-col>
    <v-col cols="12" class="my-2">
      <h2>{{ member.name }}</h2>
      <h2 v-if="!member.name" class="opacity-50 italic">Empty Member Name</h2>
    </v-col>
    <v-col cols="12">
      <v-row v-for="(target, idx) in member.targetTimes" :key="idx">
        <v-col cols="6">
          <v-label>{{ target.targetName }}</v-label>
        </v-col>
        <v-col cols="6" align="end">
          <v-label :id="`${uniqueId}-tt-time-${target.targetName}`">{{ formatTimeMS(target.minutes, target.seconds) }}</v-label>
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
    uniqueId: { type: String, required: true },
})
</script>
