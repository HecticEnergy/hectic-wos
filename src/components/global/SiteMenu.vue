<template>
  <v-app-bar :density="smAndDown ? 'compact' : 'comfortable'">
    <!-- <v-btn flat icon="mdi-home" to="/" /> -->
    <v-app-bar-nav-icon @click.stop="toggleRail" />
    <v-toolbar-title>Hectic WOS</v-toolbar-title>
    <v-spacer />
    <v-divider vertical />
    <BuyMeBeer />
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    :rail="rail"
    :permanent="!smAndDown"
  >
    <v-list nav>
      <v-list-item
        v-if="rail"
        title="Expand Menu"
        prepend-icon="mdi-unfold-more-vertical"
        @click="rail = false"
      />
      <v-list-item
        v-else
        title="Collapse Menu"
        prepend-icon="mdi-unfold-less-vertical"
        @click="rail = true"
      />
      <v-divider />
      <template v-for="item in menuItems" :key="item.label">
        <v-list-item
          v-for="subItem in item.items"
          :key="subItem.key"
          :to="subItem.to"
          :title="subItem.title"
          :prepend-icon="subItem.icon"
        />
        <v-divider v-if="item.divider" />
        <v-spacer />
      </template>
      <!-- <v-list-item
        v-if="canViewPage(RouteHelper.TEST)"
        title="Test Page"
        :to="RouteHelper.TEST"
        :prepend-icon="mdiTestTube"
      />-->
    </v-list>
    <template #append>
      <v-divider />
      <template v-for="item in bottomMenuItems" :key="item.label">
        <v-list-subheader v-if="!rail" :title="item.label"  />
        <v-list-item
            v-for="subItem in item.items"
            :key="subItem.key"
            :to="subItem.to"
            :title="subItem.title"
            :value="subItem.title"
            :prepend-icon="subItem.icon"
          />
        <v-divider v-if="item.divider" />
      </template>
      <!--
      <v-list-item
        @click="logout"
        title="Logout"
        :prepend-icon="mdiAccountOff"
        rounded="0"
      /> -->
      <!-- <v-divider />
      <v-list-item
        title="Change Theme"
        prepend-icon="mdi-light-dark-theme"
        rounded="0"
        @click="toggleTheme"
      /> -->
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import {
  // useTheme,
  useDisplay,
} from "vuetify";

import RouteHelper from "@/router/route-helper";
import { useRoute } from "vue-router";

const route = useRoute();
// const theme = useTheme();
const { smAndDown } = useDisplay();

const rail = defineModel<boolean>("rail", { required: true });

const drawer = ref(true);

const toggleRail = () => {
  rail.value = !rail.value;
  drawer.value = !drawer.value;
};

const setupMenuRail = () => {
  if (route.path === RouteHelper.HOME) {
    rail.value = false;
  } else {
    rail.value = true;
  }
};

const menuItems = ref([
  {
    label: "",
    divider: false,
    items: [
      {
        title: "Home",
        icon: "mdi-home",
        to: RouteHelper.HOME,
        key: "home-menu-item",
      },
      {
        title: "March Times",
        icon: "mdi-rocket-launch",
        to: RouteHelper.MARCH_TIME,
        key: "march-time-new-menu-item",
      },
    ],
  },
]);

const bottomMenuItems = ref([
 
{
    label: "Under Construction",
    divider: true,
    items: [
      {
        title: "Ministry Appointments",
        icon: "mdi-account-multiple-check",
        to: RouteHelper.MINISTRY_APPOINTMENTS,
        key: "ministry-appointments-menu-item",
      },
    ],
  },
  {
    label: "Legacy",
    divider: false,
    items: [
      {
        title: "March Times (v1)",
        icon: "mdi-rocket-outline",
        to: RouteHelper.MARCH_TIME_V1,
        key: "march-time-menu-item",
      },
    ],
  },
]);

watch(route, (to, from) => {
  console.debug("Route Changed", to, from);
  setupMenuRail();
});

setupMenuRail();

// const toggleTheme = () => {
//   localStorage.theme = theme.global.name.value =
//     theme.global.name.value === "customLightTheme"
//       ? "customDarkTheme"
//       : "customLightTheme";
// };
</script>
