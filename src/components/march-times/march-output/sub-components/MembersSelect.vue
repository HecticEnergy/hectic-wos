<template>
  <div class="my-4">
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
          @update:model-value="$emit('change')"
        />
        <ComboboxChips
          v-else-if="!!isGroups"
          v-model="selectedGroups"
          :all-items="memberStore.groups"
          label="Selected Groups"
          disallow-new-items
          multiple
          dense
          @update:model-value="$emit('change')"
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

const emit = defineEmits<{
  (event: "change"): void;
}>();

const showGroupDialog = ref(false);
const createGroupEdit = ref("");

const allMembers = computed(() => memberStore.members.map((m) => m.name));
const selectedMembers = computed({
  get: () => memberStore.getSelectedMembers().map((m) => m.name),
  set: (value: string[]) => {
    memberStore.getMembersByNames(value).forEach((m) => (m.isSelected = true));
    memberStore
      .getMembersByNames(allMembers.value.filter((m) => !value.includes(m)))
      .forEach((m) => (m.isSelected = false));
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
  emit("change");
};

const createGroup = () => {
  memberStore.members
    .filter((m) => selectedMembers.value.includes(m.name))
    .forEach((m) => (m.group = createGroupEdit.value));
  memberStore.saveAll();
  showGroupDialog.value = false;
  createGroupEdit.value = "";
  emit("change");
};

const closeGroupDialog = () => {
  showGroupDialog.value = false;
  createGroupEdit.value = "";
};

const isEditing = ref(defaultOpenEdit);
</script>
