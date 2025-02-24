<template>
  <v-sheet class="mb-2" rounded elevation="1">
    <v-container fluid>
      <v-row dense align="center">
        <v-col cols="auto">
          <v-checkbox
            v-if="showItemCheckbox"
            v-model="model.isSelected"
            density="compact"
            hide-details
            @change="() => emit('save', model)"
          />
        </v-col>
        <v-col cols="5" class="edit" @click="toggleEdit">
          {{ model.name }}
        </v-col>
        <v-spacer class="edit" @click="toggleEdit" />
        <v-col cols="3" class="edit" @click="toggleEdit">
          Order: {{ model.order }}
        </v-col>
        <v-col cols="auto" align="right">
          <v-icon
            :icon="isEdit ? 'mdi-close' : 'mdi-pencil'"
            flat
            @click="toggleEdit"
          />
          <!-- buttons -->
        </v-col>
      </v-row>
    </v-container>
    <DialogFullScreen v-model="isEdit" contained title="Edit Member">
      <MemberEdit
        v-if="isEdit"
        v-model="model"
        :groups="groups"
        @save="save"
        @cancel="() => (isEdit = false)"
        @delete="() => emit('remove', model)"
      />
    </DialogFullScreen>
  </v-sheet>
</template>

<script setup lang="ts">
import type { Member } from "@/models";

const model = defineModel<Member>({ required: true });
const props = defineProps<{
  groups: string[];
  showSelected?: boolean;
  editOpen?: boolean;
}>();
const emit = defineEmits<{
  (event: "remove", member: Member): void;
  (event: "save", member: Member): void;
}>();

const isEdit = ref<boolean>(props.editOpen ?? false);
const toggleEdit = () => (isEdit.value = !isEdit.value);

const save = (member: Member) => {
  emit("save", member);
  isEdit.value = false;
};

const showItemCheckbox = computed<boolean>(() => props.showSelected === true);
//
</script>

<style scoped>
.edit {
  cursor: pointer;
}
</style>
