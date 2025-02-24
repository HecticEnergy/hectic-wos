<template>
  <ParentCard>
    <v-row dense align="center" class="flex-0-0">
      <v-col cols="9">
        <v-text-field v-model="member.name" label="Name" />
      </v-col>
      <v-col cols="3">
        <NumberTextField v-model="member.order" label="Order" />
      </v-col>
    </v-row>
    <v-row dense class="flex-0-0">
      <v-col cols="12">
        <v-combobox
          v-model="member.group"
          :items="groups"
          label="Group"
          hide-details
        />
      </v-col>
    </v-row>
    <v-row dense class="flex-1-0">
      <v-col cols="12">
        <TargetEdit
          v-model="member.targetTimes"
          :member-id="member.id"
          @remove="removeTarget"
        />
      </v-col>
    </v-row>
    <template #bottomContent>
      <ButtonContainer width="95%">
        <v-row dense>
          <v-col>
            <v-btn
              color="success"
              prepend-icon="mdi-content-save"
              width="100%"
              @click="() => emit('save', member)"
            >
              Save
            </v-btn>
          </v-col>
          <v-col>
            <v-btn width="100%" color="primary" @click="addTarget">
              + target
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              prepend-icon="mdi-trash-can"
              color="error"
              width="100%"
              @click="() => (confirmDelete = true)"
            >
              Delete
            </v-btn>
          </v-col>
        </v-row>
      </ButtonContainer>
    </template>
    <cancel-confirm-dialog
      v-model="confirmDelete"
      title="Delete Member"
      :text="`Are you sure you want to delete ${member.name}?`"
      @cancel="() => (confirmDelete = false)"
      @confirm="() => emit('delete', member.id)"
    />
  </ParentCard>
</template>

<script setup lang="ts">
import type { Member } from "@/models";

const model = defineModel<Member>({ required: true });
defineProps<{ groups: string[] }>();
const member = ref<Member>(model.value);

const emit = defineEmits<{
  (e: "save", member: Member): void;
  (e: "cancel", member: Member): void;
  (e: "delete", id: number): void;
}>();

onMounted(() => {
  member.value = JSON.parse(JSON.stringify(model.value))! as Member;
});

const confirmDelete = ref(false);

const addTarget = () => {
  member.value.targetTimes.push({
    id: -1 * member.value.targetTimes.length,
    targetName: "",
    minutes: 0,
    seconds: 0,
  });
};

const removeTarget = (id: number) => {
  member.value.targetTimes = member.value.targetTimes.filter(
    (t) => t.id !== id
  );
};
</script>
