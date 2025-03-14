<template>
  <v-combobox
    v-bind="$attrs"
    v-model="model"
    v-model:search="search"
    :hide-no-data="false"
    :items="comboboxChipsPros.allItems"
    hint=""
    :label="comboboxChipsPros.label"
    hide-selected
    multiple
    hide-details="auto"
    @update:model-value="updateModel"
  >
    <template #selection="{ item, index }">
      <v-chip
        v-if="item === Object(item)"
        :text="item.value.name ?? item.value.title ?? item.value"
        size="small"
        variant="flat"
        closable
        label
        @click:close="removeSelection(index)"
      />
    </template>
    <template #item="{ item, props }">
      <v-list-item
        v-bind="props"
        :title="item.value.name ?? item.value.title ?? item.value"
      />
    </template>
    <template #no-data>
      <v-list-item>
        <v-list-item-title>
          <span v-if="search.length > 0">
            <i class="opacity-60">
              No results matching "<strong>{{ search }}</strong
              >"
            </i>
          </span>
          <span v-if="!disallowNewItems">
            <i class="opacity-60">
              Press <kbd>enter</kbd> to create a new one
            </i>
          </span>
          <span v-if="allItems.length === 0">
            <i class="opacity-60">No data available</i>
          </span>
          <span v-else-if="allItems.length === model.length">
            <i class="opacity-60">All items selected</i>
          </span>
        </v-list-item-title>
      </v-list-item>
    </template>
  </v-combobox>
</template>

<script setup lang="ts" generic="T extends ChipItem">
import { type ChipItem } from "./chip-item-model";
const model = defineModel<T[]>({ required: true });
const emit = defineEmits(["update:modelValue"]);

const comboboxChipsPros = defineProps<{
  label: string;

  allItems: T[];
  disallowNewItems?: boolean;
}>();

const search = ref("");
const removeSelection = (index: number) => {
  model.value!.splice(index, 1);
  emit("update:modelValue", model.value);
};

const getValue = (item: T) => {
  if (typeof item === "string") {
    return item;
  }
  return item.name ?? item.title ?? item;
};

const updateModel = (value: T[]) => {
  // console.log("updateModel", value, model.value, props.allItems);
  const itemsDoNotExist = value.filter(
    (v) =>
      !comboboxChipsPros.allItems.map((i) => getValue(i)).includes(getValue(v))
  );
  if (itemsDoNotExist.length > 0) {
    // console.log("itemsDoNotExist", itemsDoNotExist, value);
  }
  if (!!comboboxChipsPros.disallowNewItems && itemsDoNotExist.length > 0) {
    emit("update:modelValue", model.value);
    return;
  }
  const newItems = value.filter(
    (v) => !model.value.map((i) => getValue(i)).includes(getValue(v))
  );
  const updatedItems = newItems
    .map((i) =>
      comboboxChipsPros.allItems.find((item) => getValue(item) === getValue(i))
    )
    .filter((i) => !!i) as T[];

  if (updatedItems.length > 0) {
    // console.log("updatedItems", updatedItems);
    model.value.push(...updatedItems);
  } else {
    model.value = [] as T[];
  }

  emit("update:modelValue", model.value);
  // console.log("valueUpdated");
};
</script>
