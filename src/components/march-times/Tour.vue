<template>
  <v-tour name="marchTimesTour" :steps="steps"></v-tour>
</template>

<script lang="ts"></script>

<script lang="ts">
export default {
  name: "march-times-tour",
  data() {
    return {
      steps: [
        {
          target: '[data-tour="member-edit"]',
          content: `Welcome to the March Times page!<br />Click here to edit your members!<br />(click "next", we got it this time.)`,
        },
        {
          target: '[data-tour="members-import-btn"]',
          content:
            "On this page you add or edit your members, but let's import some members!<br />(click 'next', we will handle the button click.)",
          before: (type) =>
            new Promise((resolve, reject) => {
              document.querySelector('[data-tour="member-edit"]').click();
              window.setTimeout(() => {
                resolve();
              }, 100);
            }),
        },
        {
          target: '[data-tour="member-import-type-toggle"]',
          content:
            "You can import a single member with multiple targets, or multiple members with a single target.<br /> We'll stick with multiple targets for now.",
          before: (type) =>
            new Promise((resolve, reject) => {
              document
                .querySelector('[data-tour="members-import-btn"]')
                .click();
              window.setTimeout(() => {
                resolve();
              }, 100);
            }),
        },
        {
          target: '[data-tour="member-import-multi-htu"]',
          content:
            "This will tell you more about the fields on the page. But for import there is also a template you can copy to send to your members! Have them fill that out and send it to you in the game.",
        },
        {
          target: '[data-tour="member-import-textarea"]',
          content:
            "This is where you paste in the data your members sent you. We'll fill in some sample data for you 'next'.",
        },
        {
          target: '[data-tour="member-import-textarea"]',
          content:
            "The target names can be whatever you want, as long as there is a colon separating them from the march times.",
          before: (type) =>
            new Promise((resolve, reject) => {
              const textArea = document
                .querySelector('[data-tour="member-import-textarea"]')
                .querySelector(":scope * textarea");
              textArea.value = `Mystic
West Turret: 00:16
Sunfire Castle: 34
North Turret: 36
East Turret: 0:59
South Turret: 00:51`;
              textArea.dispatchEvent(new Event("input"));
              resolve();
            }),
        },
        {
          target: '[data-tour="member-import-group-select"]',
          content:
            "Select the group you want to import this member to. Or leave it blank. Later, when setting up who will rally, you can select groups of users by groups, or just add them one at a time.",
        },
        {
          target: '[data-tour="member-import-import-btn"]',
          content: "Click here to import the members!",
        },
        {
          target: '[data-tour="dialog-full-screen-close"]',
          content: 'And for our next trick...',
          before: (type) => 
            new Promise((resolve, reject) => {
              document
                .querySelector('[data-tour="member-import-import-btn"]')
                .click();
              window.setTimeout(() => {
                resolve();
              }, 100);
            }),
        }
      ],
    };
  },
  mounted: function () {
    this.$tours["marchTimesTour"].start();
  },
};
</script>

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
