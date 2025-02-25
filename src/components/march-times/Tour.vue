<template>
  <v-tour name="marchTimesTour" :steps="steps"></v-tour>
</template>

<script lang="ts"></script>

<script lang="ts">
import { flashElement, click, setInputValue } from "@/services/tour-helpers";


//TODO: Build a step constructor...
const openImportSteps = [
  {
    target: '[data-tour="member-edit"]',
    content: `Welcome to the March Times page!<br />Click here to edit your members!<br />(click "next", we got it this time.)`,
    before: (type) => flashElement('[data-tour="member-edit"]'),
  },
  {
    target: '[data-tour="members-import-btn"]',
    content:
      "On this page you add or edit your members, but let's import some members!<br />(click 'next', we will handle the button click.)",
    before: (type) =>
      click('[data-tour="member-edit"]').then(() =>
        flashElement('[data-tour="members-import-btn"]', 0)
      ),
  },
];

const importSteps = [
  {
    target: '[data-tour="member-import-type-toggle"]',
    content:
      "You can import a single member with multiple targets, or multiple members with a single target.<br /> We'll stick with multiple targets for now.",
    before: (type) =>
      click('[data-tour="members-import-btn"]').then(() =>
        flashElement('[data-tour="member-import-type-toggle"]')
      ),
  },
  {
    target: '[data-tour="member-import-multi-htu"]',
    content:
      "This will tell you more about the fields on the page. But for import there is also a template you can copy to send to your members! Have them fill that out and send it to you in the game.",
    before: (type) => flashElement('[data-tour="member-import-multi-htu"]'),
  },
  {
    target: '[data-tour="member-import-textarea"]',
    content:
      "This is where you paste in the data your members sent you. We'll fill in some sample data for you 'next'.",
    before: (type) => flashElement('[data-tour="member-import-textarea"]'),
  },
  {
    target: '[data-tour="member-import-textarea"]',
    content:
      "The target names can be whatever you want, as long as there is a colon separating them from the march times.",
    before: (type) =>
      setInputValue(
        '[data-tour="member-import-textarea"]',
        "textarea",
        `Mystic
West Turret: 00:16
Sunfire Castle: 34
North Turret: 36
East Turret: 0:59
South Turret: 00:51`
      ).then(() => flashElement('[data-tour="member-import-textarea"]')),
  },
  {
    target: '[data-tour="member-import-group-select"]',
    content:
      "Select the group you want to import this member to. Or leave it blank. Later, when setting up who will rally, you can select groups of members by groups, or just add them one at a time.",
    before: (type) => flashElement('[data-tour="member-import-group-select"]'),
  },
  {
    target: '[data-tour="member-import-import-btn"]',
    content: "Click here to import the members!",
    before: (type) => flashElement('[data-tour="member-import-import-btn"]'),
  },
  {
    target: '[data-tour="dialog-full-screen-close"]',
    content:
      "We will just do one for now, but you can import as many as you want!",
    before: (type) =>
      click('[data-tour="member-import-import-btn"]').then(() =>
        flashElement('[data-tour="dialog-full-screen-close"]', -1)
      ),
  },
  {
    target: '[data-tour="dialog-full-screen-close"]',
    content:
      "You can manage members and member targets here, but for now, let's go back to the main page.",
    before: (type) =>
      click('[data-tour="dialog-full-screen-close"]', -1).then(() =>
        flashElement('[data-tour="dialog-full-screen-close"]')
      ),
  },
];

const marchOutputSteps = [
  {
    target: '[data-tour="march-output-target-select"]',
    content:
      "Here you can select the target you want to view the march times for.",
    before: (type) =>
      click('[data-tour="dialog-full-screen-close"]').then(() =>
        flashElement('[data-tour="march-output-target-select"]')
      ),
  },
  {
    target: '[data-tour="member-group-select"]',
    content:
      "You can select a group of members to view their rally times here. When you add new ones (member edit or import), they are automatically selected.",
    before: (type) => flashElement('[data-tour="member-group-select"]'),
  },
  {
    target: "[data-tour='march-type-toggle-all']",
    content:
      "You pick your march type here.<br />Launch Time: you don't <i>really</i> care when they arrive, just that they arrive together.",
    before: (type) => flashElement("[data-tour='march-type-toggle-all']"),
  },
  {
    target: "[data-tour='march-type-toggle-all']",
    content:
      "...or Landing Time: you want to set the time they should all arrive.",
    before: (type) =>
      click('[data-tour="march-landing-time-card"]').then(() =>
        flashElement("[data-tour='march-type-toggle-all']")
      ),
  },
  {
    target: '[data-tour="march-type-toggle-settings"]',
    content: "Click here to adjust your settings for the march types.",
    before: (type) =>
      click("[data-tour='march-launch-time-card']").then(() =>
        flashElement("[data-tour='march-type-toggle-settings']")
      ),
  },
  {
    target: '[data-tour="march-output-display"]',
    content:
      "This is the output box. It will show you the launch times for your members, regardless of what march type you select.",
    before: (type) => flashElement('[data-tour="march-output-display"]'),
  },
  {
    target: '[data-tour="march-output-display-refresh"]',
    content:
      "You can refresh the output here. If you change the settings, it should update automatically, though you may want to recalculate based on the current time.",
    before: (type) =>
      flashElement('[data-tour="march-output-display-refresh"]'),
  },
  {
    target: '[data-tour="march-output-display-copy"]',
    content:
      "You can copy the output here. It will copy the output to your clipboard, so you can paste it into the game chat.",
    before: (type) => flashElement('[data-tour="march-output-display-copy"]'),
  },
  {
    target: "body",
    content: "This concludes your orientation. Good luck on the battle!",
    params: {
      placement: "none",
      modifiers: {
        computeStyle: {
          enabled: true,
          fn(data) {
            data.styles = Object.assign({}, data.styles, {
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            });

            return data;
          },
        },
      },
    },
  },
];

export default {
  name: "march-times-tour",
  data() {
    return {
      steps: [...openImportSteps, ...importSteps, ...marchOutputSteps],
    };
  },
  mounted: function () {
    this.$tours["marchTimesTour"].start();
  },
};
</script>
<style>
.tour-flash {
  border-radius: 15px;
  padding: 10px;
  transition: background-color 1s ease;
  transition: boarder-color 1s ease;
  background-color: yellow;
  border: yellow solid 2px;
  animation: tour-flash-anm 1s infinite;
}
@keyframes tour-flash-anm {
  0% {
    background-color: yellow;
    border-color: yellow;
  }
  100% {
    background-color: transparent;
    border-color: transparent;
  }
}
</style>
<!-- <script setup lang="ts">

const $tours = inject("$tours");

const steps = ref([
  {
    target: '[data-tour="march-times"]',
    content:
      "Welcome to the March Times page! Here you can view the launch times for the upcoming missions.",
    params: {
      placement: "bottom",
    },
  },
  {
    target: '[data-tour="march-times"]',
    content:
      "You can click on a launch time to view more details about the mission.",
    params: {
      placement: "bottom",
    },
  },
]);

onMounted(() => {
  // Start the tour
  console.log("Starting tour", $tours);
  ($tours as any)["marchTimesTour"].start();
});
</script> -->
