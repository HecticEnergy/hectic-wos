<template>
  <v-row dense height="100%">
    <v-col cols="12" data-tour="member-import-multi-htu">
      <HowToUse>
        <HtuImportMulti />
      </HowToUse>
    </v-col>
  </v-row>
  <ImportTarget
    v-model="importTargetModel"
    label="Member Data"
    data-tour="member-import-multi-textarea"
    translate="no"
    placeholder="Hectic
West Turret: 00:16
Sunfire Castle: 34
North Turret: 36
East Turret: 0:59
South Turret: 00:51"
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
