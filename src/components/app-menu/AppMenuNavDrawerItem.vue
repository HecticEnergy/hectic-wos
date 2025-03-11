<template>
  <v-list v-model:opened="open" nav>
    <template v-for="prop in navItems" :key="prop.title">
      <v-divider v-if="prop.prependDivider" />
      <v-list-item
        v-if="!prop.subItems"
        :to="prop.to"
        :title="prop.title"
        :prepend-icon="prop.prependIcon"
        :data-tour="prop.dataTour"
        @click="prop.onClick"
      />
      <v-list-group v-else :value="prop.title">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            :to="prop.to"
            :title="prop.title"
            :data-tour="prop.dataTour"
            :prepend-icon="prop.prependIcon"
            @click="prop.onClick"
          >
            <template v-if="rail" #prepend>
              <div>
                <div class="d-flex flex-column">
                  <v-icon
                    :icon="prop.prependIcon"
                    :class="
                      !open.includes(prop.title) ? 'mb-0 pb-0 opacity-60' : ''
                    "
                  />
                  <v-icon
                    :icon="
                      open.includes(prop.title)
                        ? 'mdi-chevron-up'
                        : 'mdi-chevron-down'
                    "
                    size="small"
                    :class="!open.includes(prop.title) ? 'opacity-60' : ''"
                  />
                </div>
              </div>
            </template>
          </v-list-item>
        </template>
        <template v-for="subItem in prop.subItems" :key="subItem.title">
          <v-divider v-if="subItem.prependDivider" />
          <v-list-item
            :to="subItem.to"
            :title="subItem.title"
            :data-tour="subItem.dataTour"
            :style="{
              paddingInlineStart: rail ? '10px !important' : '25px !important',
            }"
            @click="subItem.onClick"
          >
            <template #prepend>
              <v-icon :icon="subItem.prependIcon" size="small" />
            </template>
          </v-list-item>
          <v-divider v-if="subItem.appendDivider" />
        </template>
      </v-list-group>
      <v-divider v-if="prop.appendDivider" />
    </template>
  </v-list>
</template>

<script setup lang="ts">
import type { NavItemProps } from "./models";

defineProps({
  navItems: {
    type: Array as PropType<NavItemProps[]>,
    required: true,
  },
  rail: {
    type: Boolean,
    required: true,
  },
});
const open = ref<string[]>([]);
</script>
