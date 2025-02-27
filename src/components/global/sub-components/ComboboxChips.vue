<template>
  <v-combobox
    v-bind="$attrs"
    v-model="model"
    v-model:search="search"
    :hide-no-data="false"
    :items="props.allItems"
    hint=""
    :label="props.label"
    hide-selected
    multiple
    hide-details="auto"
    @update:model-value="updateModel"
  >
    <template #selection="{ item, index }">
      <v-chip
        v-if="item === Object(item)"
        :text="item.title"
        size="small"
        variant="flat"
        closable
        label
        @click:close="removeSelection(index)"
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

<script setup lang="ts">
const model = defineModel<any[]>({ required: true });
const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  label: string;

  allItems: any[];
  disallowNewItems?: boolean;
}>();

const search = ref("");
const removeSelection = (index: number) => {
  model.value!.splice(index, 1);
  emit("update:modelValue", model.value);
};

const getValue = (item: any) => (item.name === undefined ? item : item.name);

const updateModel = (value: any[]) => {
  // console.log("updateModel", value, model.value, props.allItems);
  const itemsDoNotExist = value.filter(
    (v) => !props.allItems.map((i) => getValue(i)).includes(getValue(v))
  );
  if (itemsDoNotExist.length > 0) {
    // console.log("itemsDoNotExist", itemsDoNotExist, value);
  }
  if (!!props.disallowNewItems && itemsDoNotExist.length > 0) {
    emit("update:modelValue", model.value);
    return;
  }
  const newItems = value.filter(
    (v) => !model.value.map((i) => getValue(i)).includes(getValue(v))
  );
  const updatedItems = newItems.map((i) =>
    props.allItems.find((item) => getValue(item) === getValue(i))
  );

  if (updatedItems.length > 0) {
    // console.log("updatedItems", updatedItems);
    model.value.push(...updatedItems);
  } else {
    model.value = [];
  }

  emit("update:modelValue", model.value);
  // console.log("valueUpdated");
};
</script>
