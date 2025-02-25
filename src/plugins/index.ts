/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "../stores";
import router from "../router";

import Vue3Tour from "vue3-tour";
import "vue3-tour/dist/vue3-tour.css";

//Vue.prototype.$tours = {} //https://github.com/pulsardev/vue-tour/blob/master/src/main.js
//app.provide('$axios', axios);
//

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(Vue3Tour);
}
