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
  },
});
