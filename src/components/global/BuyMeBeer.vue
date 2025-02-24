<template>
  <v-dialog
    v-model="showDialog"
    fullscreen
    transition="dialog-top-transition"
  >
    <v-card>
      <v-sheet class="pa-5" rounded>
        <v-row dense align="center">
          <v-col cols="auto" shrink>
            <v-icon
              size="x-large"
              icon="mdi-close"
              style="cursor: pointer"
              @click="showDialog = false"
            />
          </v-col>
          <v-spacer />
          <v-col cols="auto">
            <h2>I Hope You Enjoy!</h2>
          </v-col>
          <v-spacer />
          <v-spacer />
        </v-row>

        <v-row rounded align="center">
          <v-col cols="12">
            <br />
            <p>
              If this has made your life easier in some way, and you would like
              to support this tool, you can buy me a beer!
            </p>
            <br />
            <p>
              Though this is not the most professional thing I have ever made, I
              hope you find it useful!
            </p>
            <p>
              <i class="opacity-80"
                >(I polished off a 12 pack birthing this thing.)</i
              >
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
            <v-row>
              <template v-for="item in items" :key="item.title">
                <v-col cols="12">
                  <v-card
                    append-icon="mdi-open-in-new"
                    class="py-4"
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
            <p>Click on one of the items above to donate via Stripe.</p>
            <p>A new tab will open.</p>
          </v-col>
        </v-row>
      </v-sheet>
    </v-card>
  </v-dialog>
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
    title: "Buy me a pint!",
    subtitle: "$5 for a pint! Thank you!",
    url: "https://donate.stripe.com/eVa7wj8Fc1iH4ZG5kk",
    icon: "mdi-beer",
  },
  {
    title: "Buy me a growler!",
    subtitle: "$20 for a growler! Even better!",
    url: "https://donate.stripe.com/aEU9Er4oWaTheAg5kl",
    icon: "mdi-glass-mug-variant",
  },
];

const showDialog = ref(false);
</script>
