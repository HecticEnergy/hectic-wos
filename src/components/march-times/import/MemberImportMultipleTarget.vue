<template>
  <v-row dense height="100%">
    <v-col cols="12">
      <HowToUse>
        <HtuImportMulti />
      </HowToUse>
    </v-col>
  </v-row>
  <ImportTarget
    v-model="importTargetModel"
    label="Member Data"
    placeholder="Hectic
West: 00:16
SFC: 34
North: 36
East: 0:59
South: 00:51"
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
