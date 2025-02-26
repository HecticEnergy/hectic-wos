<template>
  <!-- <p class="tour-flash">Test</p> -->
  <v-chip
    class="cursor-pointer secondary"
    prepend-icon="mdi-compass"
    title="Start Tour!"
    data-tour="tour-icon"
    color="secondary"
    @click="startTour"
  >
    Start Tour!
  </v-chip>
  <v-tour v-show="!tourStopped" name="marchTimesTour" :steps="steps">
    <template #default="tour">
      <v-overlay
        :model-value="!tourStopped"
        opacity=".2"
        scrim="surface-variant"
        persistent
        style="z-index: 9999"
      >
        <transition name="fade">
          <v-step
            v-if="tour.steps[tour.currentStep]"
            :key="tour.currentStep"
            :step="tour.steps[tour.currentStep]"
            :previous-step="tour.previousStep"
            :next-step="() => nextStep(tour)"
            :stop="() => stopTour(tour)"
            :skip="() => skipTour(tour)"
            :is-first="tour.isFirst"
            :is-last="tour.isLast"
            :labels="tour.labels"
            class="pa-3 bg-surface-variant text-surface"
            style="z-index: 10000; pointer-events: auto; min-width: 350px"
          >
            <template #actions>
              <v-row dense class="d-flex justify-space-between mt-2">
                <v-col cols="auto">
                  <v-btn @click="skipTour(tour)"> Skip Tour </v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    v-if="tour.isLast"
                    color="primary"
                    @click="stopTour(tour)"
                  >
                    Finish!
                  </v-btn>
                  <v-btn v-else color="primary" @click="nextStep(tour)">
                    Next
                  </v-btn>
                </v-col>
              </v-row>
            </template>
          </v-step>
        </transition>
      </v-overlay>
    </template>
  </v-tour>
</template>

<script setup lang="ts">
import { click, setInputValue, buildStep, clearElementFlash } from "@/services/tour-helpers";
import * as tourConsts from "@/services/tour/tour-consts";

const tourStopped = ref(false);
const app = getCurrentInstance();
onMounted(() => {
  tourStopped.value = JSON.parse(
    localStorage.getItem("marchTimesTour") || "false"
  );
  if (tourStopped.value) return;
  setTimeout(() => {
    startTour();
  }, 250);
});

const startTour = () => {
  tourStopped.value = false;
  app?.proxy?.$tours["marchTimesTour"].start();
};

const nextStep = (tour: any) => {
  if (tour.isLast) {
    stopTour(tour);
    return;
  }
  tour.nextStep();
};

const stopTour = (tour: any) => {
  tour.stop();
  tourStopped.value = true;
  clearElementFlash();
  localStorage.setItem("marchTimesTour", "true");
};

const skipTour = (tour: any) => {
  tour.skip();
  tourStopped.value = true;
  clearElementFlash();
  localStorage.setItem("marchTimesTour", "true");
};

const welcomeSteps: any[] = [];

welcomeSteps.push({
  ...buildStep(
    "tour-icon",
    "This is the Tour Icon. If you ever want to run it again, click here! <br />" +
      "Welcome to the March Settings Page! <br />" +
      "We will guide you through the page to help you get started."
  ),
  params: {
    placement: "right",
  },
});

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
    ...buildStep(
      tourConsts.MARCH_TIMES_NAVBAR_LINK,
      "This concludes your orientation.<br /> Good luck on the battle!"
    ),
    params: {
      placement: "right",
    },
  },
];

const steps = ref([
  ...welcomeSteps,
  ...openImportSteps,
  ...importSteps,
  ...marchOutputSteps,
]);
</script>

<style>
.tour-flash {
  animation: pulse 1s ease infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
