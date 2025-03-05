<template>
  <ParentCard>
    <target-mode v-model="memberStore.targetMode" />
    <MemberImportMultipleTarget
      v-if="memberStore.targetMode === 'Sunfire Castle'"
      @parse-text="multipleTargetsParser"
    />
    <MemberImportSingleTarget v-else @parse-text="singleTargetParser" />

    <CancelConfirmDialog
      v-model="showConfirm"
      title="confirm edit"
      @cancel="showConfirm = false"
      @confirm="addMember(confirmEdits[0], true)"
    >
      This will replace "
      <i>
        {{ confirmEdits[0]?.name }}
      </i>
      " with the new data. Are you sure?
    </CancelConfirmDialog>
  </ParentCard>
</template>

<script setup lang="ts">
import type { Member } from "@/models";
import { useMemberStore } from "@/stores/member-store";
import { useAlertStore } from "@/stores/alert-store";
import {
  parseTextMultipleTargets,
  parseTextSingleTarget,
} from "@/services/import-parse";

const memberStore = useMemberStore();
const alertStore = useAlertStore();

const confirmEdits = ref<Member[]>([]);
const showConfirm = ref(false);

const multipleTargetsParser = (memberInfo: string, group: string) => {
  const member = parseTextMultipleTargets(memberInfo, group);
  tryAddMember(member);
};

const singleTargetParser = (memberInfo: string, group: string) => {
  const members = parseTextSingleTarget(memberInfo, group);
  members.forEach((m) => tryAddMember(m));
};

const tryAddMember = (member: Member) => {
  if (requiresConfirmation(member)) {
    console.log("requiresConfirmation", member);
    confirmEdits.value.push(member);
    showConfirm.value = true;
    return;
  }

  addMember(member);
};

const requiresConfirmation = (member: Member) => {
  return (
    memberStore.members.find(
      (m) =>
        m.name.trim().toLocaleLowerCase() ===
        member.name.trim().toLocaleLowerCase()
    ) !== undefined
  );
};

const addMember = (member: Member, isReplace?: boolean) => {
  memberStore.members = memberStore.members.filter(
    (m) =>
      m.name.trim().toLocaleLowerCase() !==
      member.name.trim().toLocaleLowerCase()
  );
  memberStore.add(member);
  showConfirm.value = false;
  confirmEdits.value = confirmEdits.value.filter((m) => m !== member);
  if (confirmEdits.value.length) {
    showConfirm.value = true;
  }
  alertStore.success(
    `Member "${member.name}" ${isReplace ? "replaced" : "added"}.`
  );
  memberStore.saveAll();
};
</script>
