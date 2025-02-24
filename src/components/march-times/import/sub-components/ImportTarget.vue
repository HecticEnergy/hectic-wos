<template>
  <v-row dense>
    <v-col cols="12">
      <v-textarea
        v-model="model.memberData"
        :label="label"
        :placeholder="placeholder"
        rows="7"
        clearable
        focused
      />
    </v-col>
    <v-col cols="12">
      <v-combobox
        v-model="model.group"
        :hide-no-data="false"
        :items="memberStore.groups"
        hint=""
        label="Select Group"
        hide-selected
        single
        hide-details="auto"
      />
    </v-col>
  </v-row>
  <ButtonContainer>
    <v-row dense width="100%">
      <v-col>
        <v-btn
          color="success"
          :disabled="!model.memberData.trim().length"
          width="100%"
          prepend-icon="mdi-upload-circle-outline"
          @click="() => $emit('parseText')"
        >
          Import
        </v-btn>
      </v-col>
      <v-col v-if="!memberStore.members.length">
        <TestData width="100%" />
      </v-col>
    </v-row>
  </ButtonContainer>
</template>

<script setup lang="ts">
import { useMemberStore } from "@/stores/member-store";
const memberStore = useMemberStore();

const model = defineModel<{
  memberData: string;
  group: string;
}>({ required: true });

defineProps<{
  label: string;
  placeholder: string;
}>();

defineEmits<{
  (e: "parseText"): void;
}>();
</script>
