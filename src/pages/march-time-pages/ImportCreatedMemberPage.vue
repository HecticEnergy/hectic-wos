<template>
  <v-row class="ma-0 pa-0">
    <v-col class="d-none d-md-block"> </v-col>
    <v-col>
      <ParentCard>
        <v-row>
          <v-col cols="12">
            <target-mode v-model="member.targetType" :change-enabled="false" />
          </v-col>
        </v-row>
        <member-view-readonly v-model="member" />
        <member-view-readonly
          v-if="!!mergedMember"
          v-model="mergedMember"
          title="Merged"
          :diff-rows="highlightRows"
          class="mt-5"
        />
        <template #bottomContent>
          <ButtonContainer width="95%">
            <v-row dense>
              <v-col>
                <v-btn
                  text="Save"
                  color="success"
                  prepend-icon="mdi-content-save"
                  width="100%"
                  :disabled="isRerouting"
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
                  :disabled="isRerouting"
                  @click="showEdit = true"
                />
              </v-col>
              <v-col>
                <v-btn
                  text="Delete"
                  color="error"
                  prepend-icon="mdi-trash-can"
                  width="100%"
                  :disabled="isRerouting"
                  @click="reroute"
                />
              </v-col>
            </v-row>
          </ButtonContainer>
        </template>
      </ParentCard>

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
          @delete="reroute"
        />
      </DialogFullScreen>
    </v-col>
    <v-col class="d-none d-md-block"> </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { type Member } from "@/models";
import routeHelper from "@/router/route-helper";
import { memberFromQueryStringFormat } from "@/services/import-parse";
import { useMemberStore } from "@/stores/member-store";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert-store";
import { mapSvsTargets } from "@/services/target-logic";

const memberStore = useMemberStore();
const router = useRouter();
const alertStore = useAlertStore();

const member = ref<Member>({
  id: memberStore.nextMemberId,
  order: memberStore.nextOrder,
  name: "",
  group: "",
  isSelected: true,
  targetTimes: [],
  targetType: "Single Target",
});

const mergedMember = ref<Member | undefined>(undefined);
const highlightRows = ref<string[]>([]);
const showEdit = ref(false);
const isRerouting = ref(false);

onMounted(() => {
  memberStore.loadData();
  const newMember = memberFromQueryStringFormat(window.location.search);

  if (newMember) {
    const targets = mapSvsTargets(newMember.targetTimes);

    member.value.name = newMember.name;
    member.value.targetTimes = targets;
    member.value.targetType = newMember.targetType;
  }

  mergedMember.value = memberStore.deDupeMember(member.value);

  mergedMember.value?.targetTimes.forEach((t) => {
    const memberTargetTime = member.value.targetTimes.find(
      (mt) => mt.targetName === t.targetName
    );
    if (
      memberTargetTime?.minutes !== t.minutes ||
      memberTargetTime?.seconds !== t.seconds
    ) {
      highlightRows.value.push(t.targetName);
    }
  });
});

const saveMember = () => {
  try {
    memberStore.addDeDupe(member.value);
    alertStore.success(`Member ${member.value.name} saved.`);
    reroute();
  } catch (error) {
    throw new Error(`There was an error importing the member: ${error}`);
  }
};

const reroute = () => {
  isRerouting.value = true;
  setTimeout(() => {
    router.push(routeHelper.MARCH_TIME);
  }, 2000);
};
</script>
