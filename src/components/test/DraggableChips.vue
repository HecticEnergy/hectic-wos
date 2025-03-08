<template>
  <div>
    <v-row class="mb-4">
      <v-col cols="12">
        <h2>Draggable Chips!</h2>
      </v-col>
    </v-row>
    <v-row class="mb-4" align="center">
      <v-col cols="12">
        <v-label>size when selected</v-label>
      </v-col>
      <v-col>
        <draggable v-model="sizes" item-key="key">
          <template #item="{ element }">
            <v-chip
              :color="element.value === size ? 'primary' : ''"
              :size="element.value"
              @click="size = element.value"
            >
              {{ element.value }}
            </v-chip>
          </template>
        </draggable>
      </v-col>
    </v-row>
    <v-row class="mb-4" align="center">
      <v-col cols="12">
        <v-label>color when selected</v-label>
      </v-col>
      <v-col>
        <draggable v-model="colors" item-key="key">
          <template #item="{ element }">
            <v-chip
              :color="element.value"
              :size="element.value === color ? 'x-large' : 'default'"
              @click="color = element.value"
            >
              {{ element.value }}
            </v-chip>
          </template>
        </draggable>
      </v-col>
    </v-row>

    <v-row class="mb-4" align="center">
      <v-col>
        <v-checkbox v-model="sortBySelected" label="sort by selected" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3>Click or Drag (What it is)</h3>
      </v-col>
      <v-col>
        <div class="bg-primary-lighten-1 rounded">
          <draggable v-model="allMembers" item-key="id">
            <template #item="{ element }">
              <v-chip
                :color="element.isSelected ? color : ''"
                :size="element.isSelected ? size : 'default'"
                class="pl-1"
                style="margin: 2px 0"
                @click="toggleMemberSelected(element)"
              >
                <v-icon icon="mdi-drag" size="large" class="move-handle" />
                {{ element.name }}
              </v-chip>
            </template>
          </draggable>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mt-4">
        <h3>Drag handle, Click name</h3>
      </v-col>
      <v-col>
        <div class="bg-primary-lighten-1 rounded">
          <draggable v-model="allMembers" item-key="id" handle=".move-handle">
            <template #item="{ element }">
              <v-chip
                :color="element.isSelected ? color : ''"
                :size="element.isSelected ? size : 'default'"
                class="pl-1"
                style="margin: 2px 0"
              >
                <v-icon icon="mdi-drag" size="large" class="move-handle" />
                <div
                  class="cursor-pointer"
                  @click="toggleMemberSelected(element)"
                >
                  {{ element.name }}
                </div>
              </v-chip>
            </template>
          </draggable>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mt-4">
        <h3>Drag handle and name, Click checkbox</h3>
      </v-col>
      <v-col>
        <div class="bg-primary-lighten-1 rounded">
          <draggable v-model="allMembers" item-key="id" handle=".move-handle">
            <template #item="{ element }">
              <v-chip
                :color="element.isSelected ? color : ''"
                :size="element.isSelected ? size : 'default'"
                class="px-1"
                style="margin: 2px 0"
              >
                <div class="move-handle cursor-pointer">
                  <v-icon icon="mdi-drag" size="large" />
                  {{ element.name }}
                </div>
                <v-icon
                  :icon="
                    element.isSelected
                      ? 'mdi-check'
                      : 'mdi-checkbox-blank-outline'
                  "
                  :class="'ml-1 ' + (element.isSelected ? '' : 'opacity-50')"
                  size="large"
                  @click="toggleMemberSelected(element)"
                />
              </v-chip>
            </template>
          </draggable>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { Member } from "@/models";
import { useMemberStore } from "@/stores/member-store";

const itemsWithKeys = (items: string[]) =>
  items.map((item) => ({ key: item, value: item }));

const size = ref<string>("large");
const sizes = ref(
  itemsWithKeys(["x-large", "large", "default", "small", "x-small"])
);

const color = ref<string>("primary");
const colors = ref(
  itemsWithKeys([
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "error",
    "background-variant",
    "surface-variant",
  ])
);

const sortBySelected = ref<boolean>(false);
watch(sortBySelected, () => sortMembers());

const memberStore = useMemberStore();

onBeforeMount(() => {
  memberStore.loadData();
});

const toggleMemberSelected = (member: Member) => {
  if (sortBySelected.value) {
    member.order =
      Math.max(
        ...allMembers.value.filter((m) => m.isSelected).map((m) => m.order)
      ) + 1;
  }
  member.isSelected = !member.isSelected;
  memberStore.save(member);
  sortMembers();
  //   emit("update");
};

const allMembers = computed<Member[]>({
  get: () => memberStore.members,
  set: (value: Member[]) => changeOrder(value),
});

const changeOrder = (members: Member[]) => {
  const updateMembers: Member[] = [];
  let order = 0;
  members.forEach((m) => {
    const newOrder = (order += 10);
    m.order = newOrder;
    updateMembers.push(m);
  });
  memberStore.members = updateMembers;
  memberStore.saveAll();
  //   emit("update");
};

const sortMembers = () => {
  let sorted = [...memberStore.members].sort((a, b) => a.order - b.order);
  if (sortBySelected.value) {
    sorted = sorted.sort((a, b) => {
      if (a.isSelected && !b.isSelected) return -1;
      if (!a.isSelected && b.isSelected) return 1;
      return 0;
    });
    let _order = 0;
    sorted = sorted.map((m) => ({ ...m, order: (_order += 10) }));
  }

  const hasChanges = sorted.some((m, i) => m.order !== (i ?? 1) * 10);
  if (hasChanges) {
    allMembers.value = sorted;
  }
};
</script>
