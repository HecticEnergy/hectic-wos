<template>
  <div>
    <v-icon
      icon="mdi-cog"
      title="settings"
      color="secondary"
      @click="isSettingsPanelOpen = !isSettingsPanelOpen"
    />
    <dialog-full-screen
      v-model="isSettingsPanelOpen"
      title="Settings Panel"
      transition="slide-x-reverse-transition"
      contained
    >
      <parent-card>
        <v-row class="ma-0 pa-0">
          <v-col cols="12">
            <v-btn
              text="View All Members"
              title="View All Members"
              prepend-icon="mdi-pencil"
              color="primary"
              width="100%"
              @click="() => (isMemberDialogOpen = true)"
            />
          </v-col>
          <v-col cols="12">
            <v-btn
              text="Add New Member"
              title="Add New Member"
              prepend-icon="mdi-plus"
              color="secondary"
              width="100%"
              @click="addNewMember"
            />
          </v-col>
          <v-col cols="12">
            <v-btn
              text="Import Members"
              title="Import Members"
              prepend-icon="mdi-upload-circle-outline"
              color="primary"
              width="100%"
              @click="() => (isMemberImportOpen = true)"
            />
          </v-col>
          <v-col cols="12">
            <v-btn
              text="Clear All Member Data"
              title="delete all user info"
              prepend-icon="mdi-trash-can"
              color="error"
              width="100%"
              data-tour="members-clear-btn"
              @click="confirmClear = true"
            />
          </v-col>
          <v-divider />
          <v-col cols="12">
            <v-switch
              v-model="isGroups"
              data-tour="groups-toggle"
              title="Toggle Groups"
              density="compact"
              hide-details
              append-icon="mdi-account-group"
              prepend-icon="mdi-account"
              @click="toggleGroupsChanged"
            />
          </v-col>
          <v-col cols="12">
            <v-btn
              text="Edit Groups"
              title="Edit Groups"
              prepend-icon="mdi-pencil"
              color="primary"
              width="100%"
              @click="() => (isGroupsDialogOpen = true)"
            />
          </v-col>
        </v-row>
        <br />
        <br />
        <h3>TODO List</h3>
        <p>
          manage groups <br />
          manage launch/landing settings <br />
          fix tour <br />
        </p>
        <template #bottomContent>
          <v-row dense>
            <v-col cols="12" align="center">
              <v-btn
                text="Done"
                title="Close the settings panel"
                prepend-icon="mdi-check"
                color="success"
                width="100%"
                @click="isSettingsPanelOpen = false"
              />
            </v-col>
          </v-row>
        </template>
      </parent-card>
    </dialog-full-screen>
    <dialog-full-screen
      v-model="isMemberEditDialogOpen"
      title="Edit Member"
      transition="slide-x-reverse-transition"
      contained
      @close="closeEditMember"
    >
      <member-edit
        v-if="!!memberStore.editMember"
        v-model="memberStore.editMember"
        :groups="memberStore.groups"
        :all-target-names="memberStore.allTargetNames"
        @save="saveMember"
        @cancel="closeEditMember"
        @delete="(m) => removeMember(m)"
      />
    </dialog-full-screen>
    <dialog-full-screen
      v-model="isMemberDialogOpen"
      title="Manage Members"
      transition="slide-x-reverse-transition"
      contained
      @close="() => (isMemberDialogOpen = false)"
    >
      <members
        v-model:members="memberStore.members"
        v-model:target-mode="memberStore.targetMode"
        :selected-target-name="memberStore.selectedTargetName"
        @update="() => emit('update')"
        @edit="(v) => (memberStore.editMember = v)"
        @save="saveMember"
        @close="() => (isMemberDialogOpen = false)"
      />
    </dialog-full-screen>
    <dialog-full-screen
      v-model="isMemberImportOpen"
      title="Import Members"
      transition="slide-x-reverse-transition"
      contained
      @close="() => (isMemberImportOpen = false)"
    >
      <member-import />
    </dialog-full-screen>
    <cancel-confirm-dialog
      v-model="confirmClear"
      title="Clear Data"
      text="Are you sure you want to clear all member data?"
      @confirm="clearAllMemberData"
    />
  </div>
</template>

<script setup lang="ts">
import type { Member, MemberTargetTimes } from "@/models";
import { getDefaultSfcMemberTargetTimes } from "@/services/target-logic";
import { useMemberStore } from "@/stores/member-store";

const memberStore = useMemberStore();

const emit = defineEmits<{
  (e: "update"): void;
}>();

const isSettingsPanelOpen = ref(false);
const isMemberDialogOpen = ref(false);
const isMemberImportOpen = ref(false);
const isMemberEditDialogOpen = ref(false);
const confirmClear = ref(false);

const isGroupsDialogOpen = ref(false);
const isGroups = ref<boolean>(!!memberStore.selectedGroups.length);

const toggleGroupsChanged = () => {
  isGroups.value = !isGroups.value;
  emit("update");
};

const saveMember = (member: Member) => {
  memberStore.save(member);
  memberStore.editMember = undefined;
  isMemberEditDialogOpen.value = false;
  emit("update");
};
const removeMember = (memberId: number) => {
  memberStore.remove(memberId);
  memberStore.editMember = undefined;
  isMemberEditDialogOpen.value = false;
  emit("update");
};

const closeEditMember = () => {
  memberStore.editMember = undefined;
  isMemberEditDialogOpen.value = false;
};

const clearAllMemberData = () => {
  memberStore.clearAllData();
};

const addNewMember = () => {
  let targets = [] as MemberTargetTimes[];
  if (memberStore.targetMode === "Sunfire Castle")
    targets = getDefaultSfcMemberTargetTimes();
  const member = {
    id: memberStore.nextMemberId,
    order: memberStore.nextOrder,
    targetType: memberStore.targetMode,
    name: "New Member",
    isSelected: true,
    targetTimes: targets,
    group: "",
  };
  memberStore.editMember = member;
  isMemberEditDialogOpen.value = true;
};
</script>
