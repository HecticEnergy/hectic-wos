<template>
  <v-app-bar :density="smAndDown ? 'compact' : 'comfortable'">
    <v-app-bar-nav-icon @click.stop="toggleDrawer" />
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-divider vertical />
    <slot name="appendTopBar"></slot>
  </v-app-bar>
  <AppMenuNavDrawer
    v-model:drawer="drawer"
    v-model:rail="rail"
    :permanent="!smAndDown"
    :top-nav-items="topNavItems"
    :bottom-nav-items="bottomNavItems"
  />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";
import AppMenuNavDrawer from "./AppMenuNavDrawer.vue";
import { bottomItems, testItems, topItems } from "./nav-items";

//TODO: Make these props
const topNavItems = ref(topItems);
const bottomNavItems = ref(bottomItems);
const isDev = ref(document.baseURI.includes("localhost"));
if (isDev.value) {
  bottomNavItems.value.push(...testItems);
}

const route = useRoute();
const { smAndDown } = useDisplay();

defineSlots<{
  appendTopBar: void;
}>();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  homeRoute: {
    type: String,
    required: false,
    default: "/",
  },
});

const rail = ref(true);
const drawer = ref(!smAndDown.value);

watch(route, (to, from) => {
  console.debug("Route Changed", to, from);
  setupMenuRail();
});

const toggleDrawer = () => {
  //rail.value = !rail.value;
  drawer.value = !drawer.value;
};

const setupMenuRail = () => {
  if (route.path === props.homeRoute) {
    rail.value = false;
  } else {
    rail.value = true;
  }
};

setupMenuRail();
</script>
