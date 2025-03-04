<template>
  <v-icon
    icon="mdi-cog"
    title="Settings"
    class="hover-cursor"
    color="primary"
    @click="isSettingsDialogOpen = true"
  />
  <dialog-full-screen
    v-model="isSettingsDialogOpen"
    title="Settings Panel"
    transition="slide-x-reverse-transition"
  >
    <ParentCard>
      <v-row class="ma-0 pa-0">
        <v-col cols="12">
          <v-btn
            text="Edit Members"
            title="Edit Members"
            prepend-icon="mdi-pencil"
            color="primary"
            width="100%"
            data-tour="member-edit"
            @click="showMemberEdit"
          />
        </v-col>
        <v-col cols="12">
          <v-btn
            text="Import Members"
            title="Import Members"
            prepend-icon="mdi-upload-circle-outline"
            color="primary"
            width="100%"
            data-tour="members-import-btn"
            @click="showMemberImport"
          />
        </v-col>
      </v-row>
      <template #bottomContent>
        <v-row dense>
          <v-col cols="12" align="center">
            <v-btn
              text="Done"
              title="Close the settings panel"
              prepend-icon="mdi-check"
              color="success"
              width="100%"
              @click="isSettingsDialogOpen = false"
            />
          </v-col>
        </v-row>
      </template>
    </ParentCard>
  </dialog-full-screen>

  <DialogFullScreen v-model="isMemberEditOpen" title="Manage Members">
    <Members />
  </DialogFullScreen>

  <DialogFullScreen v-model="isMemberImportOpen" title="Import Members">
    <MemberImport />
  </DialogFullScreen>
</template>

<script setup lang="ts">
// import { useMemberStore } from "@/stores/member-store";
// import { useMarchSettingStore } from "@/stores/march-settings-store";

// const memberStore = useMemberStore();
// const marchSettingStore = useMarchSettingStore();

const isSettingsDialogOpen = ref(false);
const isMemberEditOpen = ref(false);
const isMemberImportOpen = ref(false);

const showMemberEdit = () => {
  isMemberEditOpen.value = true;
  isSettingsDialogOpen.value = false;
};

const showMemberImport = () => {
  isMemberImportOpen.value = true;
  isSettingsDialogOpen.value = false;
};
</script>
