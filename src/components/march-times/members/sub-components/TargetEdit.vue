<template>
  <v-row
    v-for="(target, idx) in targets"
    :key="memberId + target.id + idx"
    dense
  >
    <v-col grow>
      <v-combobox
        v-model="targets[idx].targetName"
        v-model:search="targetSearch"
        :items="allTargetNames"
        label="Target Name"
        clearable
        dense
        hide-details
        @update:model-value="(value:string) => updateModel(value, idx)"
      />
    </v-col>
    <v-col cols="auto" align="center" class="d-flex flex-row">
      <TimeTextBoxes
        v-model="targets[idx]"
        @update:model-value="
          (v) =>
            updateTarget(target, { minutes: v.minutes, seconds: v.seconds })
        "
      />
      <v-row dense height="100%" align="center">
        <v-col>
          <v-icon
            color="error"
            icon="mdi-close"
            class="ml-1 cursor-pointer"
            @click="() => $emit('remove', target.id)"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { MemberTargetTimes } from "@/models";

const targets = defineModel<MemberTargetTimes[]>({ required: true });
const props = defineProps({
  memberId: { type: Number, required: true },
  allTargetNames: { type: Array<string>, required: true },
});

defineEmits<{
  (e: "remove", id: number): void;
}>();

const targetSearch = ref("");
const getValue = (item: string) => item?.toLocaleLowerCase()?.trim();

const updateModel = (value: string, index: number) => {
  const itemUpdated = props.allTargetNames.find(
    (v) => getValue(value) === getValue(v)
  );

  targets.value[index].targetName = itemUpdated ?? value;
};
const updateTarget = (
  target: MemberTargetTimes,
  newTarget: { minutes?: number; seconds?: number }
) => {
  if (!target) {
    throw new Error("target not found");
  }
  if (newTarget.minutes === undefined) {
    throw new Error("minutes is required");
  }
  if (newTarget.seconds === undefined) {
    throw new Error("seconds is required");
  }
};

onMounted(() => {
  console.log("target edit" + targets.value);
});

//
</script>
