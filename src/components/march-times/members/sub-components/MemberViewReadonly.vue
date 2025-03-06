<template>
  <v-row class="mr-1" align="baseline">
    <v-col cols="6" class="my-2">
      <h2>
        {{ member.name }}
        <h2 v-if="!member.name" class="opacity-50 italic">Empty Member Name</h2>
      </h2>
    </v-col>

    <v-col cols="3" class="my-2" align="end">
      <h4 v-if="!!original">
        <span class="opacity-50" style="font-style: italic">Original</span>
      </h4>
    </v-col>

    <v-col cols="3" class="my-2" align="end">
      <h4>
        <span class="opacity-50" style="font-style: italic">{{ title }}</span>
      </h4>
    </v-col>
    <v-col cols="12">
      <v-row v-for="(target, idx) in member.targetTimes" :key="idx">
        <v-col cols="6">
          <v-label>{{ target.targetName }}</v-label>
        </v-col>
        <v-col cols="3" align="end">
          <v-label v-if="!!getOriginalTarget(target.targetName)">
            {{
              formatTimeMS(
                getOriginalTarget(target.targetName)?.minutes,
                getOriginalTarget(target.targetName)?.seconds ?? 0
              )
            }}
          </v-label>
        </v-col>
        <v-col cols="3" align="end">
          <v-label
            :class="{
              added: getDifferent(target.targetName)?.isAdded ?? false,
              updated: getDifferent(target.targetName)?.isAdded === false,
            }"
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

type DiffRow = { isAdded: boolean; targetName: string };

const props = defineProps({
  title: { type: String, required: false, default: "" },
  diffRows: { type: Array<DiffRow>, required: false, default: () => [] },
  original: {
    type: {} as PropType<Member>,
    required: false,
    default: () => undefined,
  },
});

const getOriginalTarget = (targetName: string) =>
  !!props.original
    ? props.original?.targetTimes?.find((t) => t.targetName === targetName)
    : undefined;

const getDifferent = (targetName: string) =>
  props.diffRows.find((r) => r.targetName === targetName);
</script>

<style scoped>
.added {
  color: burlywood;
}
.updated {
  color: green;
}
</style>
