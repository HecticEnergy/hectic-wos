<template>
  <v-row dense>
    <v-col cols="12">
      <HowToUse>
        <HtuImportSingle />
      </HowToUse>
    </v-col>
  </v-row>

  <ImportTarget
    v-model="importTargetModel"
    label="Member Data"
    placeholder="Hectic: 00:16
Snow: 34
Trips: 1:36
L6F: 01:01"
    @parse-text="parseText"
  />
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "parseText", text: string, group: string): void;
}>();

const importTargetModel = ref<{
  memberData: string;
  group: string;
}>({
  memberData: "",
  group: "",
});

const parseText = () => {
  emit(
    "parseText",
    importTargetModel.value.memberData,
    importTargetModel.value.group
  );
};
</script>
