<template>
  <v-row class="ma-0 pa-0">
    <v-col class="d-none d-md-block"> </v-col>
    <v-col v-if="targetType === 'Sunfire Castle'">
      <MemberCreateSelf
        v-model="sfcMember"
        @update:model-value="saveData"
        @update:target-type="changeTargetType"
      />
    </v-col>
    <v-col v-else-if="targetType === 'Single Target'">
      <MemberCreateSelf
        v-model="stMember"
        @update:model-value="saveData"
        @update:target-type="changeTargetType"
      />
    </v-col>
    <v-col class="d-none d-md-block"> </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { Member, TargetMode } from "@/models";
import { LocalStorage } from "@/services/local-storage-typed";
import { getDefaultSfcMemberTargetTimes } from "@/services/target-logic";

onBeforeMount(() => {
  load();
});

const defaultSfc: Member = {
  id: -1,
  order: -1,
  targetType: "Sunfire Castle",
  group: "",
  isSelected: true,
  name: "",
  targetTimes: getDefaultSfcMemberTargetTimes(),
};

const defaultSt: Member = {
  id: -1,
  order: -1,
  targetType: "Single Target",
  group: "",
  isSelected: true,
  name: "",
  targetTimes: [
    {
      targetName: "Target",
      id: -2,
      minutes: 0,
      seconds: 0,
    },
  ],
};

type StoreType = {
  single: Member;
  sfc: Member;
};

const tls = new LocalStorage<StoreType>("create-member-single", {
  single: defaultSt,
  sfc: defaultSfc,
});

const targetType = ref<TargetMode>("Sunfire Castle");
const memberName = ref<string>("");

const sfcMember = ref<Member>(defaultSfc);
const stMember = ref<Member>(defaultSt);


const load = () => {
  const loaded = tls.load();
  if (!loaded) {
    return;
  }

  if (!!loaded.sfc && loaded.sfc.targetTimes.length > 0) {
    sfcMember.value = loaded.sfc;
  }
  if (!!loaded.single && loaded.single.targetTimes.length > 0) {
    stMember.value = loaded.single;
  }

  memberName.value = sfcMember.value.name ?? stMember.value.name ?? "";
};

const saveData = (member: Member) => {
  memberName.value = member.name;
  stMember.value.name = memberName.value;
  sfcMember.value.name = memberName.value;

  if (member.targetType === "Sunfire Castle") {
    sfcMember.value = member;
  } else {
    stMember.value = member;
  }

  targetType.value = member.targetType;

  // console.trace("saveData", JSON.parse(JSON.stringify(member)));
  tls.save({ sfc: sfcMember.value, single: stMember.value });
};

const changeTargetType = (value: TargetMode) => {
  targetType.value = value;
};
</script>
