<template>
  <draggable v-model="allMembers" item-key="id" handle=".move-handle">
    <template #item="{ element }"
      ><v-chip
        :color="element.isSelected ? 'primary' : ''"
        :size="element.isSelected ? 'default' : 'default'"
        class="px-1"
        style="margin: 2px 0"
      >
        <div class="move-handle cursor-pointer">
          <v-icon icon="mdi-drag" size="large" />
        </div>
        <div class="cursor-pointer" @click="toggleMemberSelected(element)">
          {{ element.name }}
        </div>
        <v-icon
          icon="mdi-pencil"
          class="ml-1"
          size="large"
          @click="edit(element)"
        />
      </v-chip>
    </template>
  </draggable>
  <!-- <v-chip
                :color="element.isSelected ? 'primary' : ''"
                class="pl-1"
                style="margin: 2px 0"
                @click="toggleMemberSelected(element)"
              >
                <v-icon icon="mdi-drag" size="large" class="move-handle" />
                {{ element.name }}
              </v-chip> -->
</template>

<script setup lang="ts">
import type { Member } from "@/models";
import { sortBySelected, updateOrder } from "@/services/member-logic";
import { useMemberStore } from "@/stores/member-store";
const memberStore = useMemberStore();

const allMembers = computed({
  get: () => memberStore.members,
  set: (value: Member[]) => changeOrder(value),
});

const emit = defineEmits<{
  (event: "update"): void;
  (event: "edit", member: Member): void;
}>();

const changeOrder = (members: Member[]) => {
  const updateMembers: Member[] = updateOrder(sortBySelected(members));
  memberStore.members = updateMembers;
  memberStore.saveAll();
  emit("update");
};

const toggleMemberSelected = (member: Member) => {
  member.isSelected = !member.isSelected;
  memberStore.save(member);
  emit("update");
};

const edit = (member: Member) => {
  emit("edit", member);
};
</script>
