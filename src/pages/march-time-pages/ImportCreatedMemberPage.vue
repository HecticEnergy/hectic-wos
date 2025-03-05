<template>
  <v-row>
    <v-col class="d-none d-md-block"> </v-col>
    <v-col>
      <ParentCard>
        <v-row>
          <v-col cols="12">
            <target-mode v-model="member.targetType" :change-enabled="false" />
          </v-col>
          <v-col cols="12" class="my-2">
            <h2>{{ member.name }}</h2>
            <h2 v-if="!member.name" class="opacity-50 italic">
              Empty Member Name
            </h2>
          </v-col>
          <v-col cols="12">
            <v-row v-for="(target, idx) in member.targetTimes" :key="idx">
              <v-col cols="6">
                <v-label>{{ target.targetName }}</v-label>
              </v-col>
              <v-col cols="6" align="end">
                <v-label>{{
                  formatTimeMS(target.minutes, target.seconds)
                }}</v-label>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <template #bottomContent>
          <ButtonContainer width="95%">
            <v-row dense>
              <v-col>
                <v-btn
                  text="Save"
                  color="success"
                  prepend-icon="mdi-content-save"
                  width="100%"
                  @click="saveMember"
                />
              </v-col>
              <v-col>
                <!-- edit -->
                <v-btn
                  text="Edit"
                  color="primary"
                  prepend-icon="mdi-pencil"
                  width="100%"
                  @click="showEdit = true"
                />
              </v-col>
              <v-col>
                <v-btn
                  text="Delete"
                  color="error"
                  prepend-icon="mdi-trash-can"
                  width="100%"
                  @click="() => router.push(routeHelper.MARCH_TIME)"
                />
              </v-col>
            </v-row>
          </ButtonContainer>
        </template>

        <DialogFullScreen
          v-model="showEdit"
          contained
          title="Edit Member"
          @close="showEdit = false"
        >
          <MemberEdit
            v-model="member"
            :groups="memberStore.groups"
            :all-target-names="memberStore.allTargetNames"
            @save="saveMember"
            @cancel="() => (showEdit = false)"
            @delete="() => router.push(routeHelper.MARCH_TIME)"
          />
        </DialogFullScreen>
      </ParentCard>
    </v-col>
    <v-col class="d-none d-md-block"> </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { type Member } from "@/models";
import routeHelper from "@/router/route-helper";
import { memberFromQueryStringFormat } from "@/services/import-parse";
import { formatTimeMS } from "@/services/time-helpers/time-formatters";
import { useMemberStore } from "@/stores/member-store";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert-store";
import { getSfcMemberTargetTimes } from "@/services/target-logic";

const memberStore = useMemberStore();
const router = useRouter();
const alertStore = useAlertStore();

const message = ref<string>("Hello World");
const member = ref<Member>({
  id: memberStore.nextMemberId,
  order: memberStore.nextOrder,
  name: "",
  group: "",
  isSelected: true,
  targetTimes: [],
  targetType: "Single Target",
});
const showEdit = ref(false);

onMounted(() => {
  memberStore.loadData();
  const urlParams = new URLSearchParams(window.location.search);
  const messageValue = [];
  for (const [key, value] of urlParams.entries()) {
    messageValue.push(`${key}=${value}`);
  }
  const toParse = messageValue.join("&");
  message.value = toParse;
  const newMember = memberFromQueryStringFormat(toParse);

  if (newMember) {
    member.value.name = newMember.name;

    const targets = getSfcMemberTargetTimes().map((t) => {
      const found = newMember.targetTimes.find(
        (nt) =>
          nt.targetName?.toLocaleLowerCase()?.trim() ===
          t.targetName.toLocaleLowerCase().trim()
      );
      if (found) {
        t.minutes = found.minutes;
        t.seconds = found.seconds;
      }
      return t;
    });
    member.value.targetTimes = targets;
    member.value.targetType = newMember.targetType;
  }
});

const saveMember = () => {
  try {
    memberStore.addDeDupe(member.value);
    alertStore.success(`Member ${member.value.name} saved.`);
  } catch (error) {
    throw new Error(`There was an error importing the member: ${error}`);
  }
};
</script>
