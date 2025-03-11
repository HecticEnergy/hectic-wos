<template>
  <v-navigation-drawer
    v-model="drawerWrapper"
    location="left"
    :rail="rail"
    :permanent="permanent"
  >
    <v-list nav>
      <v-list-item
        v-if="rail"
        title="Expand Menu"
        prepend-icon="mdi-unfold-more-vertical"
        @click="railWrapper = false"
      />
      <v-list-item
        v-else
        title="Collapse Menu"
        prepend-icon="mdi-unfold-less-vertical"
        @click="railWrapper = true"
      />
    </v-list>
      <v-divider class="mx-2" />
      <slot name="topContent">
          <app-menu-nav-drawer-item :nav-items="topNavItems" :rail="rail" />
        </slot>
      <template #append>
        <v-divider class="mx-2" />
        <slot name="bottomContent">
          <app-menu-nav-drawer-item :nav-items="bottomNavItems" :rail="rail" />
        </slot>
      </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import type { NavItemProps } from "./models";

defineSlots<{
  topContent: void;
  bottomContent: void;
}>();

const props = defineProps<{
  drawer: boolean;
  rail: boolean;
  permanent: boolean;
  topNavItems: NavItemProps[];
  bottomNavItems: NavItemProps[];
}>();

const emit = defineEmits<{
  (e: "update:drawer", value: boolean): void;
  (e: "update:rail", value: boolean): void;
}>();

const drawerWrapper = computed({
  get: () => props.drawer,
  set: (value) => emit("update:drawer", value),
});

const railWrapper = computed({
  get: () => props.rail,
  set: (value) => emit("update:rail", value),
});
</script>
