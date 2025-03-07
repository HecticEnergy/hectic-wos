<template>
  <ParentCard>
    <template #topContent>
      <target-mode v-model="memberStore.targetMode" />
    </template>
    <member-items-view
      v-if="memberStore.members.length"
      v-model="memberStore.members"
      :selected-target-name="memberStore.selectedTargetName"
      @edit="edit"
    />
    <template #bottomContent>
      <v-row dense>
        <v-col cols="4" align="center">
          <v-btn
            prepend-icon="mdi-plus"
            color="secondary"
            width="100%"
            @click="addNewMember"
          >
            member
          </v-btn>
        </v-col>
        <v-col cols="4" align="center">
          <v-btn
            text="import"
            prepend-icon="mdi-upload-circle-outline"
            color="primary"
            width="100%"
            data-tour="members-import-btn"
            @click="showImportDialog = true"
          />
        </v-col>

        <v-col cols="4" align="center">
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
  <DialogFullScreen v-model="showImportDialog" contained title="Import Members">
    <MemberImport />
  </DialogFullScreen>
  <DialogFullScreen
    v-model="isEditing"
    contained
    title="Edit Member"
    @close="closeEdit"
  >
    <MemberEdit
      v-if="!!memberStore.editMember"
      v-model="memberStore.editMember"
      :groups="memberStore.groups"
      :all-target-names="memberStore.allTargetNames"
      @save="saveMember"
      @cancel="closeEdit"
      @delete="(m) => removeMember(m)"
    />
  </DialogFullScreen>
</template>
<script setup lang="ts">
import { type Member, type MemberTargetTimes } from "@/models";
import { getSfcMemberTargetTimes } from "@/services/target-logic";
import { useMemberStore } from "@/stores/member-store";

const memberStore = useMemberStore();

const { openImport = false } = defineProps<{
  openImport?: boolean;
}>();

const isEditing = ref(!!memberStore.editMember);
const addNewMember = () => {
  let targets = [] as MemberTargetTimes[];
  if (memberStore.targetMode === "Sunfire Castle")
    targets = getSfcMemberTargetTimes();
  const member = {
    id: memberStore.nextMemberId,
    order: memberStore.nextOrder,
    targetType: memberStore.targetMode,
    name: "New Member",
    isSelected: true,
    targetTimes: targets,
    group: "",
  };

  // console.log("empty member", member);

  memberStore.editMember = member;
  isEditing.value = true;
};

const saveMember = (member: Member) => {
  memberStore.save(member);
  memberStore.editMember = undefined;
  isEditing.value = false;
};

const removeMember = (memberId: number) => {
  memberStore.remove(memberId);
  memberStore.editMember = undefined;
  isEditing.value = false;
};

const closeEdit = () => {
  memberStore.editMember = undefined;
  isEditing.value = false;
};

const edit = (member: Member) => {
  memberStore.editMember = member;
  isEditing.value = true;
};

const showImportDialog = ref<boolean>(openImport);
const confirmClear = ref<boolean>(false);
const clearData = () => {
  memberStore.clearAllData();
};
</script>
