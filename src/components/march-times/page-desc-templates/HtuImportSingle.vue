<template>
  <p>Paste in the march times and members will be parsed.</p>
  <br />
  <p>Template for your members:</p>

  <march-output-display
    :hide-refresh="true"
    unique-id="single-target-import-template"
    launch-time-output="[Member Name]: 00:00"
  />
  <br />
  <p>Example:</p>
  <v-sheet color="background" rounded class="pa-2">
    <pre>
Hectic: 00:16
Snow: 34
Trips: 1:36
L6F: 01:01</pre
    >
  </v-sheet>
  <br />
  <p>The format is this:</p>
  <v-sheet color="background" rounded class="pa-2">
    <pre>MemberName: [Minutes:]Seconds</pre>
  </v-sheet>
  <p>
    The system uses the colon after the Member Name to identify the end of the
    targets name.
  </p>
  <p>
    The minutes are optional, but if you include them, they must be followed by
    a colon. Letters in this section may break the parser.
  </p>
  <p>The seconds are required. Otherwise, why are you adding the member?</p>
  <p>
    <b><i>REMEMBER</i></b> WOS (at the time of this writing) has a limit of 7
    lines in the chat.
  </p>
  <p>
    I also recommend you use a short version of the members name, so that things
    display nicely in chat.
  </p>
</template>

<script setup lang="ts">
//
</script>
