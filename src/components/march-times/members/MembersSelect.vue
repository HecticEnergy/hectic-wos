<template>
  <div class="my-4" data-tour="member-group-select">
    <v-row dense class="d-flex flex-row" align="center">
      <v-col shrink cols="auto" align="start">
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
      <v-col grow>
        <!-- <v-chip
          data-tour="groups-toggle"
          :prepend-icon="isGroups ? 'mdi-account-group' : 'mdi-account'"
          title="Toggle Groups"
          color="secondary"
          size="small"
          :text="isGroups ? 'Toggle Members' : 'Toggle Groups'"
          style="cursor: pointer"
          @click="toggleGroupsChanged"
        /> -->
      </v-col>
      <v-col v-if="!isGroups" shrink cols="auto" align="end">
        <v-btn
          data-tour="groups-add"
          prepend-icon="mdi-plus"
          title="Add Group"
          color="secondary"
          size="small"
          text="Group"
          @click="showGroupDialog = true"
        />
      </v-col>
      <v-col shrink cols="auto" align="end">
        <v-btn
          data-tour="member-edit"
          prepend-icon="mdi-pencil"
          title="Edit Members"
          style="cursor: pointer"
          color="primary"
          size="small"
          text="Members"
          @click="() => (isMemberDialogOpen = true)"
        />
      </v-col>
    </v-row>
    <v-row
      dense
      align="center"
      class="d-flex rounded"
      width="100%"
      style="max-height: 90px; overflow-y: auto"
    >
      <v-col grow>
        <div v-if="!isGroups" class="bg-primary-lighten-1 rounded">
          <MemberSelectDraggableChips @update="$emit('update')" @edit="editMember"/>
        </div>

        <ComboboxChips
          v-if="!!isGroups"
          v-model="selectedGroups"
          :all-items="memberStore.groups"
          label="Selected Groups"
          disallow-new-items
          multiple
          dense
          @update:model-value="$emit('update')"
        />
      </v-col>
      <v-col v-if="!!isGroups" cols="auto" shrink> </v-col>
    </v-row>

    <DialogFullScreen
      v-model="isMemberDialogOpen"
      contained
      title="Manage Members"
    >
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
import type { Member } from "@/models";
import { useMemberStore } from "@/stores/member-store";
const memberStore = useMemberStore();

onMounted(() => {
  //
});

const { defaultOpenEdit = false } = defineProps<{
  defaultOpenEdit?: boolean;
}>();

const emit = defineEmits<{
  (event: "update"): void;
}>();

const showGroupDialog = ref(false);
const createGroupEdit = ref("");

const allMembers = computed(() => memberStore.members);

const selectedMembers = computed({
  get: () => memberStore.getSelectedMembers(),
  set: (value: Member[]) => {
    memberStore.members.forEach(
      (m) => (m.isSelected = value.some((v) => v.id === m.id))
    );
  },
});

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

const toggleGroupsChanged = () => {
  isGroups.value = !isGroups.value;
  emit("update");
};

const createGroup = () => {
  memberStore.members
    .filter((m) => selectedMembers.value.map((m) => m.name).includes(m.name))
    .forEach((m) => (m.group = createGroupEdit.value));
  memberStore.saveAll();
  showGroupDialog.value = false;
  createGroupEdit.value = "";
  emit("update");
};

const closeGroupDialog = () => {
  showGroupDialog.value = false;
  createGroupEdit.value = "";
};

const isMemberDialogOpen = ref(false);

const editMember = (member: Member) => {
  memberStore.editMember = member;
  isMemberDialogOpen.value = true;
};

</script>
