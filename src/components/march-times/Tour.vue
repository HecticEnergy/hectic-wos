<template>
  <v-tour name="marchTimesTour" :steps="steps"></v-tour>
</template>

<script lang="ts"></script>

<script lang="ts">
import {
  flashElement,
  click,
  setInputValue,
  buildStep,
} from "@/services/tour-helpers";
import * as tourConsts from "@/services/tour/tour-consts";

const openImportSteps = [
  buildStep(
    tourConsts.MEMBER_EDIT,
    `Welcome to the March Times page!<br />Click here to edit your members!` +
      `<br />(click "next", we got it this time.)`
  ),
  buildStep(
    tourConsts.MEMBERS_IMPORT_BTN,
    "On this page you add or edit your members, but let's import some members!" +
      "<br />(click 'next', we will handle the button click.",
    () => click(tourConsts.MEMBER_EDIT),
    0
  ),
];

const importSteps = [
  buildStep(
    tourConsts.MEMBER_IMPORT_TYPE_TOGGLE,
    "You can import a single member with multiple targets, or multiple members " +
      "with a single target.<br /> We'll stick with multiple targets for now.",
    () => click(tourConsts.MEMBERS_IMPORT_BTN)
  ),
  buildStep(
    tourConsts.MEMBER_IMPORT_MULTI_HTU,
    "This will tell you more about the fields on the page. But for import there " +
      "is also a template you can copy to send to your members! Have them fill that " +
      "out and send it to you in the game."
  ),
  buildStep(
    tourConsts.MEMBER_IMPORT_TEXTAREA,
    "This is where you paste in the data your members sent you. We'll fill in " +
      "some sample data for you 'next'."
  ),
  buildStep(
    tourConsts.MEMBER_IMPORT_TEXTAREA,
    "The target names can be whatever you want, as long as there is a colon " +
      "separating them from the march times.",
    () =>
      setInputValue(
        tourConsts.MEMBER_IMPORT_TEXTAREA,
        "textarea",
        "Mystic\nWest Turret: 00:16\nSunfire Castle: 34\nNorth Turret: 36\n" +
          "East Turret: 0:59\nSouth Turret: 00:51"
      )
  ),
  buildStep(
    tourConsts.MEMBER_IMPORT_GROUP_SELECT,
    "Select the group you want to import this member to. Or leave it blank." +
      " Later, when setting up who will rally, you can select groups of members " +
      "by groups, or just add them one at a time."
  ),
  buildStep(
    tourConsts.MEMBER_IMPORT_IMPORT_BTN,
    "Click here to import the members!"
  ),
  buildStep(
    tourConsts.DIALOG_FULL_SCREEN_CLOSE,
    "We will just do one for now, but you can import as many as you want!",
    () => click(tourConsts.MEMBER_IMPORT_IMPORT_BTN),
    -1
  ),
  buildStep(
    tourConsts.DIALOG_FULL_SCREEN_CLOSE,
    "You can manage members and member targets here, but for now, let's go " +
      "back to the main page.",
    () => click(tourConsts.DIALOG_FULL_SCREEN_CLOSE, -1)
  ),
];

const marchOutputSteps = [
  buildStep(
    tourConsts.MARCH_OUTPUT_TARGET_SELECT,
    "Here you can select the target you want to view the march times for.",
    () => click(tourConsts.DIALOG_FULL_SCREEN_CLOSE)
  ),
  buildStep(
    tourConsts.MEMBER_GROUP_SELECT,
    "You can select a group of members to view their rally times here. When you" +
      " add new ones (member edit or import), they are automatically selected."
  ),
  buildStep(
    tourConsts.MARCH_TYPE_TOGGLE_ALL,
    "You pick your march type here.<br />Launch Time: you don't <i>really</i>" +
      " care when they arrive, just that they arrive together."
  ),
  buildStep(
    tourConsts.MARCH_TYPE_TOGGLE_ALL,
    "...or Landing Time: you want to set the time they should all arrive.",
    () => click(tourConsts.MARCH_LANDING_TIME_CARD)
  ),
  buildStep(
    tourConsts.MARCH_TYPE_TOGGLE_SETTINGS,
    "Click here to adjust your settings for the march types.",
    () => click(tourConsts.MARCH_LAUNCH_TIME_CARD)
  ),
  buildStep(
    tourConsts.MARCH_OUTPUT_DISPLAY,
    "This is the output box. It will show you the launch times for your members," +
      " regardless of what march type you select."
  ),
  buildStep(
    tourConsts.MARCH_OUTPUT_DISPLAY_REFRESH,
    "You can refresh the output here. If you change the settings, it should update" +
      " automatically, though you may want to recalculate based on the current time."
  ),
  buildStep(
    tourConsts.MARCH_OUTPUT_DISPLAY_COPY,
    "You can copy the output here. It will copy the output to your clipboard, so you" +
      " can paste it into the game chat."
  ),
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
