<template>
  <div>
    <v-row
      v-for="(target, idx) in targets"
      :key="memberId + target.id + idx"
      class="d-flex flex-row justify-between"
      align="center"
      style="height: 60px;"
    >
    <v-divider />
      <template v-if="isEditing !== idx">
        <v-col cols="auto" shrink>
          <v-icon
            icon="mdi-pencil"
            class="cursor-pointer opacity-80"
            @click="isEditing = idx"
          />
        </v-col>
        <v-col grow>
          <v-label>{{ target.targetName }}</v-label>
        </v-col>
        <v-col cols="auto" shrink>
          <v-label>{{ formatTimeMS(target.minutes, target.seconds) }}</v-label>
        </v-col>

        <v-col cols="auto" shrink>
          <v-icon
            color="error"
            icon="mdi-trash-can"
            title="delete"
            class="ml-1 cursor-pointer"
            @click="() => $emit('remove', target.id)"
          />
        </v-col>
      </template>
      <template v-else>
        <v-col cols="auto" shrink class="ma-0 pa-0">
          <v-icon
            color="success"
            icon="mdi-check"
            title="close"
            class="ml-1 cursor-pointer"
            @click="isEditing = -1"
          />
        </v-col>
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
        <v-col cols="auto">
          <TimeTextBoxes
            v-model="targets[idx] as MemberTargetTimes"
            @update:model-value="
              (v) =>
                updateTarget(target, { minutes: v.minutes, seconds: v.seconds })
            "
          />
        </v-col>
      </template>
    </v-row>
    <v-divider />
  </div>
</template>

<script setup lang="ts">
import type { MemberTargetTimes } from "@/models";
import { formatTimeMS } from "@/services/time-helpers/time-formatters";

const targets = defineModel<MemberTargetTimes[]>({ required: true });
const props = defineProps({
  memberId: { type: Number, required: true },
  allTargetNames: { type: Array<string>, required: true },
});

const _isEditing = ref(-1);
const isEditing = computed({
  get: () => _isEditing.value,
  set: (v) => (_isEditing.value = v),
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
