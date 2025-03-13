<template>
  <draggable
    v-model="model"
    item-key="id"
    handle=".move-handle"
    @start="start"
    @end="draggingMemberId = null"
  >
    <template #item="{ element }">
      <div>
        <div
          :class="
            `my-2 rounded cursor-pointer` +
            (draggingMemberId === element.id ? ' on-hover' : ' ') +
            (element.isSelected ? ' bg-primary' : ' bg-surface-variant')
          "
        >
          <v-row
            class="py-2 ma-1"
            align="center"
            @click="toggleMemberSelected(element)"
          >
            <v-col cols="auto">
              <v-icon icon="mdi-drag" size="large" class="move-handle" />
            </v-col>
            <v-col>
              <label>{{ element.name }}</label>
            </v-col>
            <v-col cols="auto" class="mr-2">
              <label>{{ getMemberMarchTimeDisplay(element) }}</label>
            </v-col>
            <v-col cols="auto">
              <v-icon icon="mdi-pencil" @click.stop="edit(element)" />
            </v-col>
          </v-row>
        </div>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { formatTimeMS } from "@/services/time-helpers/time-formatters";
import type { Member } from "@/models";
import { getMemberMarchTime } from "@/services/target-logic";

const model = defineModel<Member[]>({
  required: true,
});

const props = defineProps({
  selectedTargetName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "save", members: Member): void;
  (event: "edit", member: Member): void;
  (event: "update"): void;
  (event: "update:model-value", value: Member[]): void;
}>();

const draggingMemberId = ref<number | null>(null);

const allSelectMembers = computed({
  get: () => model.value,
  set: (value: Member[]) => {
    changeOrder(value.map((m) => m));
  },
});

const start = (e: { item: { _underlying_vm_: { id: number } } }) => {
  draggingMemberId.value = e.item._underlying_vm_.id;
};

const changeOrder = (members: Member[]) => {
  const updateMembers: Member[] = [];
  let order = 0;
  members.forEach((m) => {
    const newOrder = (order += 10);
    m.order = newOrder;
    updateMembers.push(m);
  });
  emit("update");
};

const toggleMemberSelected = (element: Member) => {
  element.isSelected = !element.isSelected;
  emit("update:model-value", allSelectMembers.value);
};

const edit = (member: Member) => {
  emit("edit", member);
};

const getMemberMarchTimeDisplay = (member: Member) => {
  const marchTime = getMemberMarchTime(member, props.selectedTargetName);

  if (!marchTime) return undefined;

  return formatTimeMS(marchTime.minutes, marchTime.seconds);
};
//
</script>

<style scoped>
label {
  user-select: none;
}
.on-hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>
