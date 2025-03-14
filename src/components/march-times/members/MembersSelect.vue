<template>
  <div class="my-4" data-tour="member-group-select">
    <v-row
      dense
      align="center"
      class="d-flex rounded"
      width="100%"
      style="max-height: 90px; overflow-y: auto"
    >
      <v-col grow>
        <div v-if="!isGroups" class="bg-primary-lighten-1 rounded">
          <MemberSelectDraggableChips
            @update="$emit('update')"
            @edit="editMember"
          />
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
