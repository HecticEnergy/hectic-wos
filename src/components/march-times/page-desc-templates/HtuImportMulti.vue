<template>
  <p>
    The easiest approach is to create a template and have every member fill in
    their march times.
  </p>
  <br />
  <p>Template for your members:</p>
  <v-sheet color="background" rounded class="pa-2">
    <pre :id="copyId">
[Member Name]
North: 00:00
West: 00:00
South: 00:00
East: 00:00
SFC: 00:00
</pre
    >
    <v-row>
      <v-col cols="12" align="end">
        <v-icon
          icon="mdi-content-copy"
          class="hover-pointer"
          title="Copy"
          @click="copyTemplate"
        />
      </v-col>
    </v-row>
  </v-sheet>
  <br />
  <p>Example:</p>
  <v-sheet color="background" rounded class="pa-2">
    <pre>
Hectic
West: 00:16
SFC: 34
North: 36
East: 0:59
South: 00:51</pre
    >
  </v-sheet>
  <br />
  <p>The format is this:</p>
  <v-sheet color="background" rounded class="pa-2">
    <pre>
UserName
TargetName: [Minutes:]Seconds</pre
    >
  </v-sheet>
  <br />
  <p>The first line will be used as the username</p>
  <p>
    The target name <b>MUST</b> be consistent across all users added through
    "Import Member", or they will not be added to the rallies for that Target.
  </p>
  <p>
    The system uses the colon after the Target Name to identify the end of the
    targets name.
  </p>
  <p>
    Minutes are optional, but if you include them, they must be followed by a
    colon. Letters in this section may break the parser.
  </p>
  <p>The seconds are required. Otherwise, why are you adding the member?</p>
  <p>
    <b><i>REMEMBER</i></b> WOS (at the time of this writing) has a limit of 7
    lines in the chat. So you can do 6 members at the same time.
  </p>
  <p>
    I also recommend you use a short version of the members name, so that things
    display nicely in chat.
  </p>
</template>

<script setup lang="ts">
import { copyHtmlContent } from "@/services/html-helpers";

const copyId = "multi-target-import-template";

const copyTemplate = () => {
  copyHtmlContent(copyId);
};
</script>
