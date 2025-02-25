<template>
  <v-tour name="marchTimesTour" :steps="steps"></v-tour>
</template>

<script lang="ts">
</script>

<script lang="ts">
  export default {
    name: 'march-times-tour',
    data () {
      return {
        steps: [
            {
                target: '[data-tour="member-edit"]',
                content: 'Welcome to the March Times page! Here you can view the launch times for the upcoming missions.',
                params: {
                // placement: 'bottom'
                }
            },
            {
                target: '[data-tour="groups-toggle"]',
                content: 'You can click on a launch time to view more details about the mission.',
                params: {
                // placement: 'bottom'
                }
            }
        ]
      }
    },
    mounted: function () {
      this.$tours['marchTimesTour'].start()
    }
  }
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