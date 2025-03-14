<template>
  <ParentCard>
    <template #topContent>
      <target-mode-select v-model="targetMode" />
    </template>
    <member-items-view
      v-if="members.length"
      v-model="members"
      :selected-target-name="selectedTargetName"
      @edit="$emit('edit', $event)"
      @update="$emit('update')"
      @save="$emit('save', $event)"
    />
    <template #bottomContent>
      <v-row dense>
        <v-col cols="12" align="center">
          <v-btn
            text="Done"
            title="Close the settings panel"
            prepend-icon="mdi-check"
            color="success"
            width="100%"
            @click="$emit('close')"
          />
        </v-col>
      </v-row>
    </template>
    <v-alert
      v-if="!members.length"
      text="No Members Found"
      color="warning"
      align="center"
    />
  </ParentCard>
</template>
<script setup lang="ts">
import { type Member, type TargetMode } from "@/models";

const members = defineModel<Member[]>("members", { required: true });
const targetMode = defineModel<TargetMode>("targetMode", { required: true });

defineProps({
  selectedTargetName: {
    type: String as PropType<string>,
    required: false,
    default: "",
  },
});

defineEmits<{
  (e: "update"): void;
  (e: "edit", member: Member): void;
  (e: "save", member: Member): void;
  (e: "close"): void;
}>();
</script>
