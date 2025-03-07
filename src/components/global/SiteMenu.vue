<template>
  <v-app-bar :density="smAndDown ? 'compact' : 'comfortable'">
    <!-- <v-btn flat icon="mdi-home" to="/" /> -->
    <v-app-bar-nav-icon @click.stop="toggleDrawer" />
    <v-toolbar-title>Hectic WOS</v-toolbar-title>
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
      <v-list-item
        title="Home"
        prepend-icon="mdi-home"
        data-tour="home-navbar-link"
        :to="RouteHelper.HOME"
      />
      <v-list-group value="March Times">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            title="March Times Tools"
            prepend-icon="mdi-rocket-launch"
            data-tour="march-times-navbar-link"
          />
        </template>
        <v-list-item
          :key="key"
          title="March Times"
          data-tour="march-times-navbar-link"
          :to="RouteHelper.MARCH_TIME"
          :style="{
            paddingInlineStart: rail ? '10px !important' : '25px !important',
          }"
        >
          <template #prepend>
            <v-icon icon="mdi-rocket-launch" size="small" />
          </template>
        </v-list-item>
        <v-list-item
          :key="key"
          title="Create Yourself"
          prepend-icon="mdi-account"
          data-tour="create-member-single-navbar-link"
          :to="RouteHelper.CREATE_MEMBER_SINGLE"
          :style="{
            paddingInlineStart: rail ? '10px !important' : '25px !important',
          }"
        >
          <template #prepend>
            <v-icon icon="mdi-account" size="small" />
          </template>
        </v-list-item>
      </v-list-group>
      <v-divider />
      <v-spacer />
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
        <v-list-subheader v-if="!rail" :title="item.label" />
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
const key = ref<number>(0);
const drawer = ref(!smAndDown.value);

const toggleDrawer = () => {
  //rail.value = !rail.value;
  drawer.value = !drawer.value;
  key.value++;
};

const setupMenuRail = () => {
  if (route.path === RouteHelper.HOME) {
    rail.value = false;
  } else {
    rail.value = true;
  }
};

const bottomMenuItems = ref([
  {
    label: "Under Construction",
    divider: false,
    items: [
      {
        title: "Ministry Appointments",
        icon: "mdi-account-multiple-check",
        to: RouteHelper.MINISTRY_APPOINTMENTS,
        key: "ministry-appointments-menu-item",
        dataTour: "ministry-appointments-navbar-link",
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

<style scoped>
.list-item-tab-index-fix {
  padding-inline-start: 25px !important;
}
.list-item-tab-index-fix-rail {
  padding-inline-start: 10px !important;
}
</style>
