<template>
  <ParentCard v-bind="$attrs" title="Members">
    <draggable v-model="allMembers" item-key="id" handle=".move-handle">
      <template #item="{ element }">
        <div>
          <div
            :class="
              `my-2 rounded` +
              (element.isDragging ? ' on-hover' : ' ') +
              (element.member.isSelected ? ' bg-primary' : '  bg-background')
            "
          >
            <v-row
              class="py-2 ma-1"
              align="center"
              @click="toggleMemberSelected(element)"
            >
              <v-col cols="auto">
                <v-icon
                  icon="mdi-drag"
                  size="large"
                  class="move-handle"
                  @touchstart="move(element, true)"
                  @touchend="move(element, false)"
                  @mousedown="move(element, true)"
                  @mouseup="move(element, false)"
                />
              </v-col>
              <!-- <v-col cols="auto">
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
              </v-col> -->
              <v-col>
                <label>{{ element.name }}</label>
              </v-col>
              <v-col cols="auto" class="mr-2">
                <label>{{ element.marchTime }}</label>
              </v-col>
              <v-col cols="auto">
                <v-icon icon="mdi-pencil" @click.stop="edit(element)" />
              </v-col>
            </v-row>
          </div>
        </div>
      </template>
    </draggable>
  </ParentCard>

  <DialogFullScreen
    v-if="!!editMember"
    v-model="isEdit"
    contained
    title="Edit Member"
    @close="() => (editMember = undefined)"
  >
    <MemberEdit
      v-if="!!editMember"
      v-model="editMember"
      :groups="groups"
      :all-target-names="allTargetNames"
      @save="saveEdit"
      @cancel="() => (editMember = undefined)"
      @delete="deleteMember"
    />
  </DialogFullScreen>
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
const editMember = ref<Member | undefined>(undefined);

const groups = ref<string[]>(memberStore.groups);
const allTargetNames = ref<string[]>(memberStore.allTargetNames);

const isEdit = computed(() => !!editMember.value);

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
  loadAllMembers();
});

const loadAllMembers = () => {
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
};

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

const edit = (member: SelectMember) => {
  editMember.value = JSON.parse(JSON.stringify(member.member));
};

const saveEdit = (member: Member) => {
  if (!editMember.value) return;
  memberStore.save(member);
  loadAllMembers();
  editMember.value = undefined;
};

const deleteMember = (memberId: number) => {
  if (!editMember.value) return;
  memberStore.remove(memberId);
  loadAllMembers();
  editMember.value = undefined;
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
