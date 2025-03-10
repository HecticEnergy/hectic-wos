<template>
      <ParentCard>
        <v-row>
          <v-col cols="12">
            <target-mode
              v-model="targetType"
              @update:model-value="changeTargetType"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="memberData.name"
              label="Member Name"
              clearable
              @update:model-value.capture="() => {}"
              @blur="saveData"
            />
          </v-col>
          <v-col cols="12">
            <TargetEdit
              v-model="targetTimes"
              :all-target-names="[]"
              :member-id="memberData.id"
              :target-mode="memberData.targetType"
              @update:model-value="saveData"
            />
          </v-col>
        </v-row>
        <template #bottomContent>
          <ButtonContainer width="95%">
            <v-row dense>
              <v-col>
                <v-btn
                  text="Copy Output"
                  color="success"
                  prepend-icon="mdi-content-copy"
                  width="100%"
                  @click="copyContent"
                />
              </v-col>
              <v-col>
                <v-btn
                  text="Copy Link"
                  prepend-icon="mdi-link"
                  color="secondary"
                  width="100%"
                  @click="copyLink"
                />
              </v-col>
            </v-row>
          </ButtonContainer>
        </template>
      </ParentCard>
</template>

<script setup lang="ts">
import { type MemberTargetTimes, type Member, type TargetMode } from "@/models";
import routeHelper from "@/router/route-helper";
import {
  memberToQueryStringFormat,
  formatMemberForImport,
} from "@/services/import-parse";
import { useAlertStore } from "@/stores/alert-store";

const alertStore = useAlertStore();

const memberData = defineModel<Member>({ required: true });

const emit = defineEmits<{
  (e: "update:model-value", value: Member): void;
  (e: "update:target-type", value: TargetMode): void;
}>();

const targetType = ref<TargetMode>(memberData.value.targetType);
const targetTimes = ref<MemberTargetTimes[]>(memberData.value.targetTimes);

const validate = () => {
  if (memberData.value.name === "") {
    throw new Error("Name is required");
  }
  if (targetTimes.value.length === 0) {
    throw new Error("At least one target is required");
  }
  if (targetTimes.value.some((t) => t.targetName === "")) {
    throw new Error("All targets must have a name");
  }
  if (targetTimes.value.every((t) => t.minutes == 0 && t.seconds == 0)) {
    throw new Error("At least one target time must be specified");
  }
};

const changeTargetType = (value: TargetMode) => {
  emit("update:target-type", value);
};

const saveData = () => {
  memberData.value.name = memberData.value.name?.trim();
  memberData.value.targetTimes = targetTimes.value.map((t) => ({
    ...t,
    targetName: t.targetName?.trim(),
  }));
  emit("update:model-value", memberData.value);
  //   console.log("saveData", JSON.parse(JSON.stringify(member.value)));
};

const copyContent = () => {
  validate();
  memberData.value.targetTimes = targetTimes.value;

  const content = formatMemberForImport(memberData.value);
  navigator.clipboard.writeText(content);
  alertStore.success("Content copied to clipboard");
};

const copyLink = () => {
  validate();
  memberData.value.targetTimes = targetTimes.value;

  const url = window.location.origin + routeHelper.IMPORT_CREATED_MEMBERS;
  const content = memberToQueryStringFormat(memberData.value);
  const link = `${url}?${content}`;
  navigator.clipboard.writeText(link);
  alertStore.success("Link copied to clipboard");
};
</script>
