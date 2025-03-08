<template>
  <ParentCard color="background">
    <v-container style="max-width: 800px">
      <home-card
        :title="welcome.title"
        :icon="welcome.icon"
        :text-lines="welcome.textLines"
      >
        <template #append>
          <p>
            <v-icon
              icon="mdi-glass-mug-variant"
              color="secondary"
              class="mr-1"
              @click="showBeer"
            />
            Buy me a beer to support this project!
          </p>
        </template>
      </home-card>

      <home-card
        :title="marchTimes.title"
        :icon="marchTimes.icon"
        :text-lines="marchTimes.textLines"
        @icon-click="marchTimes.iconClick"
      >
        <template #append>
          <home-card
            :title="marchTimesCreateYourself.title"
            :icon="marchTimesCreateYourself.icon"
            :text-lines="marchTimesCreateYourself.textLines"
            @icon-click="marchTimesCreateYourself.iconClick"
          />
        </template>
      </home-card>

      <home-card
        :title="ministry.title"
        :icon="ministry.icon"
        :text-lines="ministry.textLines"
        @icon-click="ministry.iconClick"
      >
        <template #prepend>
          <p>
            <i class="opacity-40">This page is still under construction</i>
          </p>
          <br />
        </template>
      </home-card>

      <home-card
        :title="wosnerds.title"
        :text-lines="wosnerds.textLines"
        icon="mdi-link"
      >
        <template #title-icon>
          <v-img src="../../assets/greg.png" width="30" height="30" rounded />
        </template>
        <template #append>
          <v-row class="d-flex justify-space-between" align="end">
            <v-col style="max-height: 46px">
              <a href="https://discord.gg/dMYY8bcPXp" target="_blank">
                <v-img
                  src="../../assets/discord.webp"
                  style="
                    position: abosolute;
                    top: -12px;
                    left: -12px;
                    width: 60px;
                    height: 60px;
                  "
                />
              </a>
            </v-col>
            <v-col align="end">
              <a href="https://wosnerds.com" target="_blank">wosnerds.com</a>
            </v-col>
          </v-row>
        </template>
      </home-card>

      <home-card
        :title="thankYous.title"
        :icon="thankYous.icon"
        :text-lines="thankYous.textLines"
      >
        <template #title-icon>
          <v-icon :icon="thankYous.icon" color="secondary" />
        </template>
        <template #append>
          <h3 class="text-secondary">Thank You!</h3>
          <p>
            This site wouldn't be what it is without your help! I hope many find
            it useful!
          </p>
        </template>
      </home-card>
    </v-container>
  </ParentCard>
</template>

<script lang="ts" setup>
import routeHelper from "@/router/route-helper";
import { useRouter } from "vue-router";

const router = useRouter();

const welcome = {
  title: "Hectic WOS!",
  icon: "mdi-hand-wave",
  textLines: [
    "Welcome!",
    "We have designed a few tools that should make managing your alliance a bit easier.",
    "I'd like to expand the functionality of this site by putting a database behind this, but that costs money.",
  ],
};

const showBeer = () => {
  try {
    (
      document.querySelector('[data-tour="donate-link"]') as HTMLElement
    ).click();
  } catch (e) {
    console.error(e);
  }
};

const marchTimes = {
  title: "March Times",
  icon: "mdi-rocket-launch",
  toLocation: routeHelper.MARCH_TIME,
  textLines: [
    "Have you ever been batch healing, and trying to run rallies, but no one has the time to calculate the march times?",
    "Well, this tool is for you!",
  ],
  iconClick: () => router.push(routeHelper.MARCH_TIME),
};

const marchTimesCreateYourself = {
  title: "Create Yourself!",
  icon: "mdi-account",
  textLines: [
    "It's kind of drag having to constantly maintain your member's march times.",
    "You can have your members fill out a form, and then paste the data into import!",
    "OR BETTER YET",
    "Have them send you the link and it will conveniently import the data!",
    "(Additionally, if they just need to update their data, it will also handle merging the new and existing data!)",
  ],
  iconClick: () => router.push(routeHelper.CREATE_MEMBER_SINGLE),
};

const ministry = {
  title: "Ministry Appointments",
  icon: "mdi-account-multiple-check",
  textLines: [
    "Organizing buffs can be such a pain!",
    "Have your members DM you their speedups and FCs in the specified format, and you can sort an organize them easily!",
    "You can copy the selected members, and their preferred times, and send it to whoever is managing the ministry appointments!",
  ],
  iconClick: () => router.push(routeHelper.MINISTRY_APPOINTMENTS),
};

const wosnerds = {
  title: "WOS Nerds",
  textLines: [
    "Come visit our friends on WOS Nerds!",
    `"WOS Nerds is all about digging into data, running tests, and
figuring out the best strategies. We'd like to minimize any
guides/advice that's not based on some solid/decent proof."`,
    "They have a lot of great tools and resources for the game!",
  ],
};

const thankYous = {
  title: "Thank You!",
  icon: "mdi-hand-heart",
  textLines: [
    "Many thanks to those who have contributed!",
    "Snowdrop - for accumulated hours of early pre-release testing and feedback!! Bugs were found and decisions were made! Also for the help with the HTU pages!",
    "Ironman - for the jokes and entertainment, and much gratitude for your early (and continued!) feedback!",
    "Mofarch - very early UI review and continuing to help make many suggestions for improvement! (...and potentially for some future dev help too!)",
    "Mystic - more and MORE enhancement suggestions! Many great ideas that are yet to come... and for helping me find my blind spots in usability!",
    "L6F - for helping me refine the original idea!",
    "Waco - for the many enhancement suggestions made early on! The tool became more complicated than my original vision, but now it's more robust!",
    "Ragnar - for pointing out some serious bugs I missed before a major release!",
    "...and to all the other's I have been pestering for feedback who responded!",
  ],
};
</script>
