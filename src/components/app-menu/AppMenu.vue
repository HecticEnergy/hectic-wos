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
import { useDisplay } from "vuetify";
import AppMenuNavDrawer from "./AppMenuNavDrawer.vue";
import { setup, bottomItems, testItems, topItems } from "./nav-items";

//TODO: Make these props
setup();
const topNavItems = ref(topItems);
const bottomNavItems = ref(bottomItems);
const isDev = ref(!document.baseURI.includes("hectic-wos.com"));
if (isDev.value) {
  bottomNavItems.value.push(...testItems);
}

const { smAndDown } = useDisplay();

defineSlots<{
  appendTopBar: void;
}>();

defineProps({
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

onMounted(() => {
  rail.value = localStorage.getItem("rail") === "true";
  console.log("load rail", rail.value);
});

const rail = ref<boolean>(false);

watch(rail, (value) => {
  localStorage.setItem("rail", value.toString());
  console.log("set rail", value);
});

const drawer = ref(!smAndDown.value);

const toggleDrawer = () => {
  //rail.value = !rail.value;
  drawer.value = !drawer.value;
};
</script>
