<template>
  <v-card class="ma-0 pa-0" height="98%" rounded>
    <!-- <v-row
      dense
      class="d-flex flex-column ma-0 position-absolute top-0 bottom-0 left-0"
      style="height:100%; width: 100%"
      >
      <v-col
        cols="auto"
        class="d-flex flex-column flex-grow-1 ma-1"
      >
        <div>
          <slot name="topContent" />
          top
        </div>
      </v-col>
      <v-col
        class="d-flex flex-column flex-grow-1"
        style="overflow-y: auto; width: 100%; max-height: 100%;"
      >
        <div>
          middle
          <slot />
        </div>
      </v-col>
      <v-col class="d-flex flex-column flex-grow-1">
        <div>
          <slot name="bottomContent" />
          bottom
        </div>
      </v-col>
    </v-row> -->
    <div class="container">
      <div class="section">
        <div class="content">
          <h3 align="center">{{ title }}</h3>
          <slot name="topContent" />
        </div>
      </div>
      <div class="scrollable-content content">
        <slot />
      </div>
      <div class="content">
        <slot name="bottomContent" />
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
defineSlots<{
  default: void;
  topContent: void;
  bottomContent: void;
}>();

defineProps<{
  title?: string;
}>();
</script>

<style scoped>
div {
  margin: 0;
  padding: 0;
}

.container {
  /* give the outermost container a predefined size */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 2px;
  padding: 2px;
}

.section {
  flex-grow: 1;

  display: flex;
  flex-direction: column;

  /* for Firefox */
  min-height: 0;
}
.content {
  margin: 5px;
}

.scrollable-content {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  /* for Firefox */
  min-height: 0;
  padding-bottom: 30px;
}
</style>
