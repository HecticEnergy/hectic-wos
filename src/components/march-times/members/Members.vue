<template>
  <ParentCard>
    <template #topContent>
      <HowToUse>
        <HtuMembers />
      </HowToUse>
    </template>
    <MemberItemView
      v-for="(member, idx) in memberStore.members"
      :key="member.id"
      v-model="memberStore.members[idx]"
      :groups="memberStore.groups"
      :show-selected="false"
      :edit-open="editingMemberId === member.id"
      @save="saveMember"
      @remove="(item:Member) => memberStore.remove(item.id)"
    />
    <template #bottomContent>
      <v-row dense>
        <v-col cols="4" align="center">
          <v-btn
            prepend-icon="mdi-plus"
            color="primary"
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
            color="success"
            width="100%"
            data-tour="members-import-btn"
            @click="showImportDialog = true"
          />
        </v-col>

        <v-col cols="4" align="center">
          <v-btn
            text="clear"
            prepend-icon="mdi-close"
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
    text="Are you sure you want to clear all data?"
    @confirm="clearData"
  />
  <DialogFullScreen v-model="showImportDialog" contained title="Import Members">
    <MemberImport />
  </DialogFullScreen>
</template>
<script setup lang="ts">
import type { Member } from "@/models";
import { useMemberStore } from "@/stores/member-store";

const memberStore = useMemberStore();

const { openImport = false } = defineProps<{
  openImport?: boolean;
}>();

const editingMemberId = ref<number | null>(null);
const addNewMember = () => {
  const member = {
    id: memberStore.nextMemberId,
    order: memberStore.nextOrder,
    name: "New Member",
    isSelected: true,
    targetTimes: [],
    group: "",
  };

  memberStore.add(member);
  editingMemberId.value = member.id;
};

const saveMember = (member: Member) => {
  memberStore.save(member);
  editingMemberId.value = null;
};

const showImportDialog = ref<boolean>(openImport);
const confirmClear = ref<boolean>(false);
const clearData = () => {
  memberStore.clearAllData();
};
</script>
