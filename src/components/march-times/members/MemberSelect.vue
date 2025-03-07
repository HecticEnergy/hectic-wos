<template>
  <ParentCard v-bind="$attrs" title="Members">
    <draggable v-model="allSelectMembers" item-key="id" handle=".move-handle">
      <template #item="{ element }">
        <div>
          <div
            :class="
              `my-2 rounded` +
              (element.isDragging ? ' on-hover' : ' ') +
              (element.member.isSelected ? ' bg-primary' : '  bg-background')
            "
          >
            <v-row
              class="py-2 ma-1"
              align="center"
              @click="toggleMemberSelected(element)"
            >
              <v-col cols="auto">
                <v-icon
                  icon="mdi-drag"
                  size="large"
                  class="move-handle"
                  @touchstart="move(element, true)"
                  @touchend="move(element, false)"
                  @mousedown="move(element, true)"
                  @mouseup="move(element, false)"
                />
              </v-col>
              <!-- <v-col cols="auto">
                <v-icon
                  :icon="
                    element.member.isSelected
                      ? 'mdi-check'
                      : 'mdi-square-rounded-outline'
                  "
                  :color="element.member.isSelected ? 'success' : ''"
                  size="small"
                  @click="toggleMemberSelected(element)"
                />
              </v-col> -->
              <v-col>
                <label>{{ element.name }}</label>
              </v-col>
              <v-col cols="auto" class="mr-2">
                <label>{{ element.marchTime }}</label>
              </v-col>
              <v-col cols="auto">
                <v-icon icon="mdi-pencil" @click.stop="edit(element)" />
              </v-col>
            </v-row>
          </div>
        </div>
      </template>
    </draggable>
  </ParentCard>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import { formatTimeMS } from "@/services/time-helpers/time-formatters";
import type { Member } from "@/models";
import { getMemberMarchTime } from "@/services/target-logic";

const model = defineModel<Member[]>({
  required: true,
});

const props = defineProps({
  selectedTargetName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "save", members: Member): void;
  (event: "edit", member: Member): void;
}>();

type SelectMember = {
  id: number;
  isDragging: boolean;
  name: string;
  marchTime: string | undefined;
  member: Member;
};

const _allMembers = ref<SelectMember[] | undefined>(undefined);

const allSelectMembers = computed({
  get: () => _allMembers.value,
  set: (value: SelectMember[]) => {
    const updateMembers: Member[] = [];
    let order = 0;
    value.forEach((m) => {
      const newOrder = (order += 10);
      if (m.member.order !== newOrder) {
        m.member.order = newOrder;
        updateMembers.push(m.member);
      }
    });
    _allMembers.value = value;
    updateMembers.forEach((m) => emit("save", m));
  },
});
const isDragging = ref<boolean>(false);

onMounted(() => {
  loadAllMembers();
});

const loadAllMembers = () => {
  allSelectMembers.value = model.value
    .sort((m) => m.order)
    .map((member) => {
      return {
        id: member.id,
        name: member.name,
        marchTime: getMemberMarchTimeDisplay(member),
        member,
      } as SelectMember;
    });
};

const move = (element: SelectMember, isMouseDown: boolean) => {
  isDragging.value = isMouseDown;
  element.isDragging = isMouseDown;
  allSelectMembers.value?.forEach((m) => {
    if (m.id !== element.id) {
      m.isDragging = false;
    }
  });
};

const toggleMemberSelected = (element: SelectMember) => {
  element.member.isSelected = !element.member.isSelected;
  const modelMember = model.value.find((m) => m.id === element.id);
  if (modelMember) {
    modelMember.isSelected = element.member.isSelected;
  }
};

const edit = (member: SelectMember) => {
  emit("edit", member.member);
};

const getMemberMarchTimeDisplay = (member: Member) => {
  const marchTime = getMemberMarchTime(member, props.selectedTargetName);

  if (!marchTime) return undefined;

  return formatTimeMS(marchTime.minutes, marchTime.seconds);
};
//
</script>

<style scoped>
label {
  user-select: none;
}
.on-hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>
