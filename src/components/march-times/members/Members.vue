<template>
  <ParentCard>
    <MemberItemView
      v-if="memberStore.editMember"
      v-model="memberStore.editMember!"
      :groups="memberStore.groups"
      :all-target-names="memberStore.allTargetNames"
      :show-selected="false"
      :edit-open="isEditing"
      @save="saveMember"
      @remove="removeMember"
      @close-edit="closeEdit"
    />
    <MemberItemView
      v-for="(member, idx) in memberStore.members"
      :key="member.id"
      v-model="memberStore.members[idx]"
      :groups="memberStore.groups"
      :all-target-names="memberStore.allTargetNames"
      :show-selected="false"
      :edit-open="false"
      @save="saveMember"
      @remove="removeMember"
      @close-edit="closeEdit"
    />
    <template #bottomContent>
      <v-row dense>
        <v-col cols="6" align="center">
          <v-btn
            prepend-icon="mdi-plus"
            color="secondary"
            width="100%"
            @click="addNewMember"
          >
            member
          </v-btn>
        </v-col>
        <v-col cols="6" align="center">
          <v-btn
            text="clear"
            title="delete all user info"
            prepend-icon="mdi-trash-can"
            color="error"
            width="100%"
            data-tour="members-clear-btn"
            @click="confirmClear = true"
          />
        </v-col>
      </v-row>
    </template>
    <v-alert
      v-if="!memberStore.members.length"
      text="No Members Found"
      color="warning"
      align="center"
    />
  </ParentCard>
  <CancelConfirmDialog
    v-model="confirmClear"
    title="Clear Data"
    text="Are you sure you want to clear all member data?"
    @confirm="clearData"
  />
</template>
<script setup lang="ts">
import type { Member } from "@/models";
import { useMemberStore } from "@/stores/member-store";

const memberStore = useMemberStore();

const isEditing = ref(!!memberStore.editMember);
const addNewMember = () => {
  const member = {
    id: memberStore.nextMemberId,
    order: memberStore.nextOrder,
    name: "New Member",
    isSelected: true,
    targetTimes: [],
    group: "",
  };

  memberStore.editMember = member;
  isEditing.value = true;
};

const saveMember = (member: Member) => {
  memberStore.save(member);
  memberStore.editMember = undefined;
  isEditing.value = false;
};

const removeMember = (member: Member) => {
  memberStore.remove(member.id);
  memberStore.editMember = undefined;
  isEditing.value = false;
};

const closeEdit = () => {
  memberStore.editMember = undefined;
  isEditing.value = false;
};

const confirmClear = ref<boolean>(false);
const clearData = () => {
  memberStore.clearAllData();
};
</script>
