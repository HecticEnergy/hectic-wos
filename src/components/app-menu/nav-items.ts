import routeHelper from "@/router/route-helper";
import type { NavItemProps } from "./models";
import { ThemeSelect } from "@/services/vuetify-themes";

let themeSelect: ThemeSelect;
export const setup = () => (themeSelect = new ThemeSelect());

export const topItems: NavItemProps[] = [
  {
    title: "Home",
    prependIcon: "mdi-home",
    onClick: undefined,
    to: routeHelper.HOME,
    dataTour: "home-navbar-link",
    prependDivider: false,
    appendDivider: false,
    subItems: undefined,
  },
  {
    title: "March Times",
    prependIcon: "mdi-rocket-launch",
    onClick: undefined,
    to: undefined,
    dataTour: "march-times-navbar-link",
    prependDivider: false,
    appendDivider: false,
    subItems: [
      {
        title: "March Time",
        prependIcon: "mdi-rocket-launch",
        onClick: undefined,
        to: routeHelper.MARCH_TIME,
        dataTour: "march-time-navbar-link",
        prependDivider: false,
        appendDivider: false,
        subItems: undefined,
      },
      {
        title: "Create Single Member",
        prependIcon: "mdi-account-plus",
        onClick: undefined,
        to: routeHelper.CREATE_MEMBER_SINGLE,
        dataTour: "create-member-single-navbar-link",
        prependDivider: false,
        appendDivider: false,
        subItems: undefined,
      },
    ],
  },
];

export const bottomItems: NavItemProps[] = [
  {
    title: "Ministry Appointments",
    prependIcon: "mdi-account-multiple-check",
    onClick: undefined,
    to: routeHelper.MINISTRY_APPOINTMENTS,
    dataTour: "ministry-appointments-navbar-link",
    prependDivider: false,
    appendDivider: false,
    subItems: undefined,
  },
];

export const testItems: NavItemProps[] = [
  {
    title: "Test Pages",
    prependIcon: "mdi-beaker",
    onClick: undefined,
    to: undefined,
    dataTour: "test-page-navbar-link",
    prependDivider: false,
    appendDivider: false,
    subItems: [
      {
        title: "Test Page",
        prependIcon: "mdi-test-tube",
        onClick: undefined,
        to: routeHelper.TEST_PAGE,
        dataTour: "test-page-navbar-link",
        prependDivider: false,
        appendDivider: false,
        subItems: undefined,
      },
      {
        title: "Colors Page",
        prependIcon: "mdi-palette",
        onClick: undefined,
        to: routeHelper.COLORS_PAGE,
        dataTour: "colors-page-navbar-link",
        prependDivider: false,
        appendDivider: false,
        subItems: undefined,
      },
      {
        title: "Transitions Page",
        prependIcon: "mdi-transition",
        onClick: undefined,
        to: routeHelper.TRANSITIONS_PAGE,
        dataTour: "transitions-page-navbar-link",
        prependDivider: false,
        appendDivider: false,
        subItems: undefined,
      },
      {
        title: "Draggable Chips Page",
        prependIcon: "mdi-cursor-move",
        onClick: undefined,
        to: routeHelper.DRAGGABLE_CHIPS_PAGE,
        dataTour: "draggable-chips-page-navbar-link",
        prependDivider: false,
        appendDivider: false,
        subItems: undefined,
      },
      {
        title: "Switch Theme",
        prependIcon: "mdi-theme-light-dark",
        onClick: () => themeSelect.rotateTheme(),
        to: undefined,
        dataTour: "vuetify-themes-page-navbar-link",
        prependDivider: false,
        appendDivider: false,
        subItems: undefined,
      },
    ],
  },
];
