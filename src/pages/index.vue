<template>
  <ParentCard color="background">
    <v-container style="max-width: 800px">
      <v-card rounded class="ma-5 pa-5">
        <v-card-title>
          <v-icon color="secondary" icon="mdi-hand-wave" class="mr-5" />
          Hectic WOS!
        </v-card-title>
        <v-card-text class="pt-5">
          <p>Welcome!</p>
          <br />
          <p>
            We have designed a few tools that should make managing your alliance
            <i>a bit</i> easier.
          </p>
          <br />
          <p>
            I'd like to expand the functionality of this site by putting a
            database behind this, but that costs money.
          </p>
          <br />
          <p>
            <v-icon icon="mdi-glass-mug-variant" class="mr-1" />
            Check out the beer link at the top to support this project!
          </p>
        </v-card-text>
      </v-card>

      <v-card rounded class="ma-5 pa-5">
        <v-card-title>
          <v-icon color="secondary" icon="mdi-rocket-launch" class="mr-5" />
          March Times
        </v-card-title>
        <v-card-text class="pt-5">
          <p>
            Have you ever been batch healing, and trying to run rallies, but no
            one has the time to calculate the march times?
          </p>
          <br />
          <p>Well, this tool is for you!</p>
          <br />
          <p>
            Simply collect and import your rally callers' march times, select
            your launch settings, and you can keep dropping launch times into
            chat!
          </p>
        </v-card-text>
      </v-card>
      <v-card rounded class="ma-5 pa-5">
        <v-card-title>
          <v-icon
            color="secondary"
            icon="mdi-account-multiple-check"
            class="mr-5"
          />
          Ministry Appointments
        </v-card-title>
        <v-card-text class="pt-5">
          <p>
            <i class="opacity-40">This page is still under construction</i>
          </p>
          <br />
          <p>Organizing buffs can be such a pain!</p>
          <br />
          <p>
            Have your members DM you their speedups and FCs in the specified
            format, and you can sort an organize them easily!
          </p>
          <br />
          <p>
            You can copy the selected members, and their preferred times, and
            send it to whoever is managing the ministry appointments!
          </p>
        </v-card-text>
      </v-card>

      <v-card rounded class="ma-5 pa-5">
        <v-card-title>
          <v-row class="d-flex">
            <v-col cols="auto" shrink>
              <v-img
                src="../assets/greg.png"
                width="30"
                height="30"
                rounded
                class="mr-5"
              />
            </v-col>
            <v-col grow> WOS Nerds </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="pt-5">
          <p>Come visit our friends on WOS Nerds!</p>
          <br />
          <p>
            "WOS Nerds is all about digging into data, running tests, and
            figuring out the best strategies. We'd like to minimize any
            guides/advice that's not based on some solid/decent proof."
          </p>
          <br />
          <p>They have a lot of great tools and resources for the game!</p>
          <br />
          <v-row class="d-flex justify-space-between" align="end">
            <v-col>
              <v-img
                src="../assets/discord.webp"
                width="30"
                height="30"
                href="https://discord.gg/dMYY8bcPXp"
                target="_blank"
              />
            </v-col>
            <v-col align="end">
              <a href="https://wosnerds.com" target="_blank">wosnerds.com</a>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card rounded class="ma-5 pa-5">
        <v-card-title>
          <v-icon color="secondary" icon="mdi-hand-heart" class="mr-5" />
          Thank You!
        </v-card-title>
        <v-card-text class="pt-5">
          <p>Many thanks to those who have contributed!</p>
          <br />
          <p>L6F - for helping me refine the original idea!</p>
          <br />
          <p>
            Snowdrop - for help with cleaning up the "How to use" pages, and
            accumulated hours of early pre-release testing!! Bugs were found and
            decisions were made!
          </p>
          <br />
          <p>
            Waco - for the many enhancement suggestions made early on! The tool
            became more complicated than my original vision, but now it's more
            robust!
          </p>
          <br />
          <p>
            Mystic - more enhancement suggestions! and for helping me find my
            blind spots in usability!
          </p>
          <br />
          <p>
            Mofarch - very early UI review and helping make many suggestions for
            improvement! (...and potentially for some future dev help too!)
          </p>
          <br />
          <p>
            Ironman - mostly for the jokes and entertainment, but also for early
            feedback!
          </p>
          <br />
          <p>
            Ragnar - for pointing out some serious bugs I missed before a major
            release!
          </p>
          <br />
          <p>
            ...and to all the other's I have been pestering for feedback who
            responded!
          </p>
          <br />
          <h3>Thank You!</h3>
          <p>
            This site wouldn't be what it is without your help! I hope many find
            it useful!
          </p>
        </v-card-text>
      </v-card>
    </v-container>
  </ParentCard>
</template>

<script lang="ts" setup></script>
