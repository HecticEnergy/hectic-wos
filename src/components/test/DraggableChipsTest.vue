<template>
  <div>
    <v-row class="mb-4">
      <v-col cols="12">
        <h2>Draggable Chips!</h2>
      </v-col>
    </v-row>

    <v-row class="mb-4 d-flex flex-column align-center">
      <v-col>
        <v-checkbox
          v-model="sortBySelected"
          label="Sort by Selected"
          hide-details
        />
      </v-col>
      <v-col>
        <v-select
          v-model="dragHandleSelectModel"
          :items="dragHandleSelectItems"
          item-title="name"
          item-value="value"
          label="Drag Handle"
        />
      </v-col>
    </v-row>

    <v-row class="mb-4 align-center">
      <v-col cols="12">
        <v-label>Size when selected</v-label>
      </v-col>
      <v-col>
        <draggable-chips
          v-model="sizes"
          :selected-color="color"
          :selected-size="size"
          :drag-handle="dragHandleSelectModel"
          :checkbox="dragHandleSelectModel === 'drag-icon-name'"
          :radio="true"
          :sort-by-selected="sortBySelected"
          @click="size = $event.name"
          @update:model-value="sizes = $event"
        />
      </v-col>
    </v-row>
    <v-row class="mb-4 align-center">
      <v-col cols="12">
        <v-label>Color when selected</v-label>
      </v-col>
      <v-col>
        <draggable-chips
          v-model="colors"
          :selected-color="color"
          :selected-size="size"
          :drag-handle="dragHandleSelectModel"
          :checkbox="dragHandleSelectModel === 'drag-icon-name'"
          :radio="true"
          :sort-by-selected="sortBySelected"
          @click="color = $event.name"
          @update:model-value="colors = $event"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-label>Members!</v-label>
      </v-col>
      <v-col>
        <draggable-chips
          v-model="allMembers"
          :selected-color="color"
          :selected-size="size"
          :drag-handle="dragHandleSelectModel"
          :checkbox="dragHandleSelectModel === 'drag-icon-name'"
          :sort-by-selected="sortBySelected"
          @update:model-value="allMembers = $event"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useMemberStore } from "@/stores/member-store";
import type { DragHandleType } from "./draggable-chips/chips-types";

const itemsWithKeys = (
  items: string[],
  selectedItem: string,
  setColor?: boolean
) =>
  items.map((item) => {
    const i = {
      id: item,
      name: item,
      isSelected: selectedItem == item,
      color: undefined as string | undefined,
    };
    if (setColor) {
      i.color = item;
    }
    return i;
  });

const size = ref<string>("large");
const sizes = ref(
  itemsWithKeys(["x-large", "large", "default", "small", "x-small"], size.value)
);

const color = ref<string>("primary");
const colors = ref(
  itemsWithKeys(
    [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "error",
      "background-variant",
      "surface-variant",
    ],
    color.value,
    true
  )
);

const dragHandleSelectModel = ref<DragHandleType>("drag-name");
const dragHandleSelectItems = ref<{ name: string; value: DragHandleType }[]>([
  { name: "Drag by icon", value: "drag-icon" },
  { name: "Drag by name", value: "drag-name" },
  { name: "Drag by icon and name (Checkboxes!)", value: "drag-icon-name" },
]);

const sortBySelected = ref<boolean>(false);

const memberStore = useMemberStore();

onBeforeMount(() => {
  memberStore.loadData();
});

const allMembers = ref(memberStore.members);
watch(
  () => memberStore.members,
  () => {
    memberStore.saveAll();
  }
);
// computed<Member[]>({
//   get: () => memberStore.members,
//   set: (value: Member[]) => changeOrder(value),
// });

// const changeOrder = (members: Member[]) => {
//   const updateMembers: Member[] = [];
//   let order = 0;
//   members.forEach((m) => {
//     const newOrder = (order += 10);
//     m.order = newOrder;
//     updateMembers.push(m);
//   });
//   memberStore.members = updateMembers;
//   memberStore.saveAll();
//   //   emit("update");
// };
</script>
