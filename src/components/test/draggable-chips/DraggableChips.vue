<template>
  <div class="bg-primary-lighten-1 rounded">
    <draggable
      v-model="allItems"
      item-key="id"
      handle=".move-handle"
    >
      <template #item="{ element }">
        <v-chip
          :color="element.color ?? (element.isSelected ? selectedColor : '')"
          :size="element.isSelected ? selectedSize : 'default'"
          :class="props.dragHandle === 'drag-icon-name' ? 'px-1' : 'pl-1'"
          style="margin: 2px 0"
          @click="props.checkbox ? undefined : click(element)"
        >
          <div
            :class="
              props.dragHandle === 'drag-icon-name'
                ? 'move-handle cursor-pointer'
                : ''
            "
          >
            <v-icon
              icon="mdi-drag"
              size="large"
              :class="
                props.dragHandle === 'drag-icon'
                  ? 'move-handle cursor-pointer'
                  : ''
              "
            />
            <span
              :class="
                props.dragHandle === 'drag-name'
                  ? 'move-handle cursor-pointer'
                  : ''
              "
            >
              <slot>{{ element.name }}</slot>
            </span>
          </div>
          <v-icon
            v-if="props.checkbox"
            :icon="
              element.isSelected ? 'mdi-check' : 'mdi-checkbox-blank-outline'
            "
            :class="'ml-1 ' + (element.isSelected ? '' : 'opacity-50')"
            size="large"
            @click="click(element)"
          />
        </v-chip>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts" generic="T extends DraggableChipType">
import type { DraggableChipType, DragHandleType } from "./chips-types";

const allItems = defineModel<T[]>({
  required: true,
});

const props = defineProps<{
  selectedColor: string;
  selectedSize: string;
  dragHandle: DragHandleType;
  checkbox: boolean;
  radio?: boolean;
  sortBySelected?: boolean;
}>();

onUpdated(() => {
  if (props.sortBySelected) sortBySelected();
});

const emit = defineEmits<{
  (e: "click", element: T): void;
  (e: "update:modelValue", value: T[]): void;
}>();

const click = (element: T) => {
  if (props.radio && !element.isSelected) {
    allItems.value.forEach((m) => {
      if (m.id === element.id) {
        m.isSelected = true;
      } else {
        m.isSelected = false;
      }
    });
  } else if (!props.radio) {
    element.isSelected = !element.isSelected;
  }
  sortBySelected();
  emit("update:modelValue", allItems.value);
  emit("click", element);
};

const sortBySelected = () => {
  let sorted = allItems.value;
  if (props.sortBySelected) {
    sorted = sorted.sort((a, b) => {
      if (a.isSelected && !b.isSelected) return -1;
      if (!a.isSelected && b.isSelected) return 1;
      return 0;
    });

    console.log("sorted", JSON.parse(JSON.stringify(sorted)));
  }
  const hasChanges = sorted.some((m, i) => m.id !== allItems.value[i].id);
  if (hasChanges) {
    console.log("hasChanges", JSON.parse(JSON.stringify(sorted)));
    allItems.value = sorted;
    console.log(JSON.parse(JSON.stringify(allItems.value)));
  }
};
</script>
