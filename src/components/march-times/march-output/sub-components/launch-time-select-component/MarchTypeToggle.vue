<template>
  <v-row dense class="d-flex" width="100%" data-tour="march-type-toggle-all">
    <v-col
      :cols="marchSettingsType !== 'launch' ? 'auto' : ''"
      class="ma-0 pa-0"
      :style="{ height: showDetails ? '170px' : 'auto' }"
      shrink
      grow
    >
      <LaunchTimeCard
        v-model="marchSettingsType"
        :show-details="showDetails"
        @click="$emit('change')"
      />
    </v-col>
    <v-col
      :cols="marchSettingsType !== 'landing' ? 'auto' : ''"
      class="ma-0 pa-0"
      :style="{ height: showDetails ? '170px' : 'auto' }"
      shrink
      grow
    >
      <LandingTimeCard
        v-model="marchSettingsType"
        :show-details="showDetails"
        @click="$emit('change')"
      />
    </v-col>
    <v-col
      v-if="showSettingsCog"
      cols="auto"
      class="d-flex flex-column justify-space-around"
    >
      <v-icon
        icon="mdi-cog"
        data-tour="march-type-toggle-settings"
        @click="showMarchEditDialog = true"
      />
    </v-col>
  </v-row>

  <DialogFullScreen
    v-model="showMarchEditDialog"
    contained
    title="Edit March Settings"
  >
    <MarchSettingsEdit @close="showMarchEditDialog = false" />
  </DialogFullScreen>
</template>

<script setup lang="ts">
import {
  useMarchSettingStore,
  type MarchSettingsType,
} from "@/stores/march-settings-store";
const marchSettingStore = useMarchSettingStore();
const model = defineModel<MarchSettingsType>({ required: false });
const { showSettingsCog = true, showDetails = true } = defineProps<{
  showSettingsCog?: boolean;
  showDetails?: boolean;
}>();
defineEmits<{
  (e: "change"): void;
}>();

const marchSettingsType = computed<MarchSettingsType>({
  get: () => model?.value ?? marchSettingStore.marchSettingsType,
  set: (value) => {
    if (!!model?.value) {
      model.value = value;
    } else {
      marchSettingStore.marchSettingsType = value;
      marchSettingStore.saveData();
    }
  },
});

const showMarchEditDialog = ref(false);
</script>
