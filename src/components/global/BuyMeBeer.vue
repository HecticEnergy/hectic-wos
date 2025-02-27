<template>
  <dialog-full-screen
    v-model="showDialog"
    title="I Hope You Enjoy!"
    transition="dialog-top-transition"
  >
    <ParentCard>
      <v-container>
        <p>
          If this has made your life easier in some way and you would like to
          support this tool, you can buy me a beer!
        </p>
        <br />
        <v-row>
          <template v-for="item in items" :key="item.title">
            <v-col cols="12">
              <v-card
                append-icon="mdi-open-in-new"
                class="pt-4 pb-0"
                rel="noopener noreferrer"
                rounded="lg"
                variant="text"
                :title="item.title"
                :subtitle="item.subtitle"
                @click="openInNewTab(item.url)"
              >
                <template #prepend>
                  <v-icon size="x-large" :icon="item.icon" />
                </template>
                <v-card-text align="center">
                  <i class="opacity-30">
                    Click to donate via Stripe in a new tab.
                  </i>
                </v-card-text>
                <v-overlay
                  opacity=".09"
                  scrim="primary"
                  contained
                  model-value
                  persistent
                />
              </v-card>
            </v-col>
          </template>
        </v-row>
        <br />
        <p>
          Though this is not the most professional thing I have ever made, I
          hope you find it useful!
        </p>
        <p>
          <i class="opacity-80">
            (I polished off a 12 pack birthing this thing.)
          </i>
        </p>
        <p>
          <i class="opacity-80"> (...then another making improvements...) </i>
        </p>
        <br />
        <p>
          I refuse to put ads on things I create, though this is not free to
          run.
        </p>
        <p>
          <i class="opacity-80">
            (Not all the money goes to beer, but hopefully some of it!)
          </i>
        </p>

        <br />
        <p>
          There are several other things I want to add to make these features
          more collaborative.
        </p>
        <i class="opacity-80">
          (More beer is more fuel. <br />
          Oh, and paying for serverless compute and database resources...)
        </i>
      </v-container>
    </ParentCard>
  </dialog-full-screen>

  <!-- <v-layout-item model-value position="bottom" class="text-end" size="88"> -->
  <div class="ma-4">
    <v-icon
      icon="mdi-glass-mug-variant"
      class="hover-pointer"
      size="large"
      @click="showDialog = true"
    />
  </div>
  <!-- </v-layout-item> -->
</template>

<script setup lang="ts">
import { openInNewTab } from "@/services/html-helpers";
import { ref } from "vue";

const items = [
  {
    title: "Send a pint or two!",
    subtitle: "$5 for a pint! Thank you!",
    url: "https://donate.stripe.com/eVa7wj8Fc1iH4ZG5kk",
    icon: "mdi-beer",
  },
  {
    title: "Get me a growler!",
    subtitle: "$20 for a growler! Even better!",
    url: "https://donate.stripe.com/aEU9Er4oWaTheAg5kl",
    icon: "mdi-glass-mug-variant",
  },
];

const showDialog = ref(false);
</script>
