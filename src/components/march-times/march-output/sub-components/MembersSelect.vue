<template>
  <div class="my-4">
    <v-row dense class="d-flex flex-row">
      <v-col shrink cols="auto" align="right" class="mr-2">
        <v-icon
          data-tour="groups-toggle"
          :icon="isGroups ? 'mdi-account-group' : 'mdi-account'"
          title="Toggle Groups"
          style="cursor: pointer"
          flat
          @click="isGroupsChanged"
        />
      </v-col>
      <v-spacer grow />
      <v-col shrink cols="auto" align="right" class="mr-2">
        <v-icon
          data-tour="groups-add"
          icon="mdi-plus"
          title="Create Group"
          :style="{
            cursor: 'pointer',
            visibility: !isGroups ? 'visible' : 'hidden',
          }"
          flat
          @click="showGroupDialog = true"
        />
      </v-col>
      <v-col shrink cols="auto" align="right">
        <v-icon
          data-tour="member-edit"
          icon="mdi-pencil"
          title="Edit Members"
          style="cursor: pointer"
          flat
          @click="() => (isEditing = true)"
        />
      </v-col>
    </v-row>
    <v-row dense align="center" class="d-flex" width="100%">
      <v-col grow data-tour="member-group-select">
        <ComboboxChips
          v-if="!isGroups"
          v-model="selectedMembers"
          :all-items="allMembers"
          label="Select Members"
          disallow-new-items
          multiple
          dense
        />
        <ComboboxChips
          v-else-if="!!isGroups"
          v-model="selectedGroups"
          :all-items="memberStore.groups"
          label="Selected Groups"
          disallow-new-items
          multiple
          dense
        />
      </v-col>
      <v-col cols="auto" shrink />
    </v-row>

    <DialogFullScreen v-model="isEditing" contained title="Manage Members">
      <Members :open-import="defaultOpenEdit" />
    </DialogFullScreen>

    <v-dialog v-model="showGroupDialog" max-width="400">
      <v-card>
        <v-card-title> Create Group </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <ComboboxChips
                v-model="selectedMembers"
                :all-items="allMembers"
                label="Select Members"
                disallow-new-items
                multiple
                dense
              />
            </v-col>
            <v-col cols="12">
              <v-combobox
                v-model="createGroupEdit"
                :hide-no-data="false"
                :items="memberStore.groups"
                label="Select Group"
                single
                hide-details="auto"
              />
            </v-col>
          </v-row>
          <!-- TODO: Show members who will have their groups changed -->
          <!-- OR: make it so a member can be part of more than one group -->
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createGroup"> Create </v-btn>
          <v-btn color="error" @click="closeGroupDialog"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useMemberStore } from "@/stores/member-store";
const memberStore = useMemberStore();

onMounted(() => {
  //
});

const { defaultOpenEdit = false } = defineProps<{
  defaultOpenEdit?: boolean;
}>();

const showGroupDialog = ref(false);
const createGroupEdit = ref("");

const allMembers = ref<string[]>(memberStore.members.map((m) => m.name));
const selectedMembers = computed({
  get: () => memberStore.getSelectedMembers().map((m) => m.name),
  set: (value: string[]) => {
    memberStore.getMembersByNames(value).forEach((m) => (m.isSelected = true));
    memberStore
      .getMembersByNames(allMembers.value.filter((m) => !value.includes(m)))
      .forEach((m) => (m.isSelected = false));
  },
});

//TODO: add a button to the left to toggle groups vs members
const isGroups = ref<boolean>(!!memberStore.selectedGroups.length);
const selectedGroups = computed({
  get: () => memberStore.selectedGroups,
  set: (value: string[]) => {
    const groupNames = memberStore.groupNames.filter((g) => value.includes(g));
    console.log("set:selectedGroups", value, groupNames);
    const newSelectedMembers = memberStore.members.filter((m) =>
      groupNames.includes(m.group)
    );
    newSelectedMembers.forEach((m) => (m.isSelected = true));
    memberStore.members
      .filter((m) => !newSelectedMembers.includes(m))
      .forEach((m) => (m.isSelected = false));
    memberStore.selectedGroups = groupNames;
    memberStore.saveAll();
  },
});

const isGroupsChanged = () => {
  isGroups.value = !isGroups.value;
};

const createGroup = () => {
  memberStore.members
    .filter((m) => selectedMembers.value.includes(m.name))
    .forEach((m) => (m.group = createGroupEdit.value));
  memberStore.saveAll();
  showGroupDialog.value = false;
  createGroupEdit.value = "";
};

const closeGroupDialog = () => {
  showGroupDialog.value = false;
  createGroupEdit.value = "";
};

const isEditing = ref(defaultOpenEdit);
</script>
