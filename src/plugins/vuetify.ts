/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

const customLightTheme = {
  name: "customLightTheme",
  dark: false,
  colors: {
    surface: "#FFF",
    background: "#EEE",
    primary: "#3F51B5",
    onPrimary: "#212121",
    secondary: "#607D8B",
    onSecondary: "#757575",
    accent: "#448AFF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107",
  },
  variables: {},
};

const customDarkTheme = {
  name: "customDarkTheme",
  dark: true,
  colors: {
    primary: "#3F51B5",
    onPrimary: "#212121",
    secondary: "#607D8B",
    onSecondary: "#757575",
    accent: "#448AFF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107",
  },
  variables: {},
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults: {
    VTextField: {
      hideDetails: true,
    },
    VSelect: {
      hideDetails: true,
    },
    vCheckBox: {
      hideDetails: true,
    },
    VRow: {
      dense: true,
    },
  },
  theme: {
    defaultTheme: "dark",
    themes: {
      customDarkTheme,
      customLightTheme,
    },
  },
});
