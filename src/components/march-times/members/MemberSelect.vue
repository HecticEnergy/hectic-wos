<template>
  <ParentCard color="background">
    <h2>Members</h2>
    <draggable v-model="allMembers" item-key="id">
      <template #item="{ element }">
        <div>
          <div
            :class="
              `my-2 bg-surface rounded ` +
              (element.isDragging ? 'on-hover' : '')
            "
          >
            <v-row
              class="py-2 ma-1"
              align="center"
              @touchstart="move(element, true)"
              @mousedown="move(element, true)"
            >
              <v-col cols="auto">
                <v-icon
                  :icon="
                    element.member.isSelected
                      ? 'mdi-check'
                      : 'mdi-square-rounded-outline'
                  "
                  :color="element.member.isSelected ? 'success' : ''"
                  size="small"
                  @click="toggleMemberSelected(element)"
                />
              </v-col>
              <v-col>
                <label>{{ element.name }}</label>
              </v-col>
              <v-col cols="auto">
                <label>{{ element.marchTime }}</label>
              </v-col>
              <v-col cols="auto">
                <v-icon icon="mdi-pencil" color="primary" @click="edit" />
              </v-col>
            </v-row>
          </div>
        </div>
      </template>
    </draggable>
    <!-- Member list items -->
    <!-- Name: MarchTime (if target selected) -->
    <!-- toggle "selected" on click -->
    <!-- Click to select -->
  </ParentCard>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import { formatTimeMS } from "@/services/time-helpers/time-formatters";
import { useMemberStore } from "@/stores/member-store";
import type { Member } from "@/models";

const memberStore = useMemberStore();

type SelectMember = {
  id: number;
  isDragging: boolean;
  name: string;
  marchTime: string | undefined;
  member: Member;
};

const _allMembers = ref<SelectMember[] | undefined>(undefined);

const allMembers = computed({
  get: () => _allMembers.value,
  set: (value: SelectMember[]) => {
    let order = 0;
    value.forEach((m) => {
      m.member.order = order += 10;
    });
    _allMembers.value = value;
    memberStore.saveAll();
  },
});
const isDragging = ref<boolean>(false);

onMounted(() => {
  memberStore.loadData();
  allMembers.value = memberStore.members
    .sort((m) => m.order)
    .map((member) => {
      return {
        id: member.id,
        name: member.name,
        marchTime: getMemberMarchTime(member.name),
        member,
      } as SelectMember;
    });
});

const move = (element: SelectMember, isMouseDown: boolean) => {
  isDragging.value = isMouseDown;
  element.isDragging = isMouseDown;
  allMembers.value?.forEach((m) => {
    if (m.id !== element.id) {
      m.isDragging = false;
    }
  });
};

const toggleMemberSelected = (element: SelectMember) => {
  element.member.isSelected = !element.member.isSelected;
  memberStore.saveAll();
};

const edit = () => {
  console.log("edit");
};

const getMemberMarchTime = (memberName: string) => {
  const marchTime = memberStore.getMemberMarchTime(memberName);

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
