<template>
  <v-row class="ma-0 pa-0">
    <v-col class="d-none d-md-block"> </v-col>
    <v-col>
      <ParentCard>
        <v-row>
          <v-col cols="12">
            <target-mode
              v-model="member.targetType"
              @update:model-value="changeTargetType"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="member.name"
              label="Member Name"
              clearable
              @update:model-value="saveData"
            />
          </v-col>
          <v-col cols="12">
            <TargetEdit
              v-model="targetTimes"
              :all-target-names="[]"
              :member-id="member.id"
              :target-mode="member.targetType"
              @update:model-value="saveData"
              @remove="removeTarget"
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
    </v-col>
    <v-col class="d-none d-md-block"> </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { type MemberTargetTimes, type Member } from "@/models";
import routeHelper from "@/router/route-helper";
import {
  memberToQueryStringFormat,
  formatMemberForImport,
} from "@/services/import-parse";
import { LocalStorage } from "@/services/local-storage-typed";
import { getSfcMemberTargetTimes } from "@/services/target-logic";
import { useAlertStore } from "@/stores/alert-store";

const alertStore = useAlertStore();

const defaultMember: Member = {
  id: -1,
  order: -1,
  targetType: "Sunfire Castle",
  group: "",
  isSelected: true,
  name: "",
  targetTimes: [],
};

const tls = new LocalStorage<Member>("create-member-single", defaultMember);
const member = ref<Member>(defaultMember);

const targetTimes = ref<MemberTargetTimes[]>(member.value.targetTimes);

onMounted(() => {
  changeTargetType(member.value.targetType);
  const loaded = tls.load();
  if (!!loaded && loaded.targetTimes.length > 0) {
    member.value = loaded;
    targetTimes.value = member.value.targetTimes;
  }
});

const saveData = () => {
  member.value.name = member.value.name?.trim();
  member.value.targetTimes = targetTimes.value.map((t) => ({
    ...t,
    targetName: t.targetName?.trim(),
  }));
  //   console.log("saveData", JSON.parse(JSON.stringify(member.value)));
  tls.save(member.value);
};

const removeTarget = (id: number) => {
  targetTimes.value = targetTimes.value.filter((t) => t.id !== id);
};

const changeTargetType = (type: string) => {
  if (type === "Sunfire Castle") {
    targetTimes.value = getSfcMemberTargetTimes();
  } else if (type === "Single Target") {
    targetTimes.value = [
      {
        targetName: "",
        id: -2,
        minutes: 0,
        seconds: 0,
      },
    ];
  } else {
    //Should never get here
    throw new Error("Invalid target type");
  }
  member.value.targetType = type;
};

const validate = () => {
  if (member.value.name === "") {
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

const copyContent = () => {
  validate();
  member.value.targetTimes = targetTimes.value;

  const content = formatMemberForImport(member.value);
  navigator.clipboard.writeText(content);
  alertStore.success("Content copied to clipboard");
};

const copyLink = () => {
  validate();
  member.value.targetTimes = targetTimes.value;

  const url = window.location.origin + routeHelper.IMPORT_CREATED_MEMBERS;
  const content = memberToQueryStringFormat(member.value);
  const link = `${url}?${content}`;
  navigator.clipboard.writeText(link);
  alertStore.success("Link copied to clipboard");
};
</script>
