<template>
  <v-card>
    <v-row dense>
      <v-col cols="6">
        <v-select
          v-model="animationName"
          :items="animationsRef"
          label="Animation Name"
          item-title="name"
          item-value="name"
          @update:model-value="nextAnimation(0)"
        />
      </v-col>
      <v-col cols="auto">
        <v-btn color="secondary" @click="getNextAnimation"
          >Next Animation</v-btn
        >
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="nextAnimation">Next control</v-btn>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="mdiIcon" label="mdi Icon"></v-text-field>
      </v-col>
      <v-col>
        <a href="https://pictogrammers.com/library/mdi/" target="_blank"
          >MDI Icon Library</a
        >
      </v-col>
    </v-row>
  </v-card>
  <v-card>
    <v-row dense align="center">
      <v-col>
        <v-btn
          color="secondary"
          :class="animationName1"
          @click="nextAnimation(0)"
        >
          Smpl Button
        </v-btn>
      </v-col>
      <v-col>
        <v-icon
          size="large"
          color="secondary"
          :class="animationName2"
          :icon="mdiIcon"
          @click="nextAnimation(1)"
        />
      </v-col>
      <v-col>
        <v-text-field
          label="Sample Text Box"
          :class="animationName3"
          @click="nextAnimation(2)"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-select
          label="Sample Select Box"
          :class="animationName4"
          @click="nextAnimation(3)"
        ></v-select>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
const animationName = ref<string>("");
const mdiIcon = ref<string>("mdi-axe-battle");

const animationName1 = ref<string>("");
const animationName2 = ref<string>("");
const animationName3 = ref<string>("");
const animationName4 = ref<string>("");

const getNextAnimation = () => {
  const idx = animationsRef.value.findIndex((a) => a.name === animationName.value);
  animationName.value = animationsRef.value[(idx + 1) % animationsRef.value.length].name;
    nextAnimation(index - 1);
};

let index = 0;
const nextAnimation = (idx: number = -1) => {
  index = idx >= 0 ? idx : index;
  const name = animationName.value;

  animationName1.value = "";
  animationName2.value = "";
  animationName3.value = "";
  animationName4.value = "";

  switch (index % 4) {
    case 0:
      animationName1.value = name;
      break;
    case 1:
      animationName2.value = name;
      break;
    case 2:
      animationName3.value = name;
      break;
    case 3:
      animationName4.value = name;
      break;
  }
  index++;
};

const animations = [
  {
    name: "wiggle1",
  },

  {
    name: "wigglePt2",
  },

  {
    name: "wigglePt5",
  },
  {
    name: "wigglePt7",
  },
  {
    name: "wigglePt9",
  },
  {
    name: "pulse",
  },
  {
    name: "bounce",
  },
  {
    name: "shake",
  },
  {
    name: "spin",
  },
  {
    name: "scale3dEase",
  },
  {
    name: "scale3dLinear",
  },
];

const animationsRef = ref(animations);
//
</script>

<style scoped>
.wiggle1 {
  animation: wiggle 1s ease infinite;
}
.wigglePt2 {
  animation: wiggle 0.2s ease infinite;
}
.wigglePt5 {
  animation: wiggle 0.5s ease infinite;
}
.wigglePt7 {
  animation: wiggle 0.7s ease infinite;
}
.wigglePt9 {
  animation: wiggle 0.9s ease infinite;
}
.pulse {
  animation: pulse 1s ease infinite;
}
.bounce {
  animation: bounce 1s ease infinite;
}
.shake {
  animation: shake 1s ease infinite;
}
.spin {
  animation: spin 1s linear infinite;
}
.scale3dEase {
  animation: scale3d 1s ease infinite;
}
.scale3dLinear {
  animation: scaleInOut3d 1s linear infinite;
}

@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(-5deg);
  }
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

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes scale3d {
  0% {
    transform: scale3d(1, 1, 1);
  }
  50% {
    transform: scale3d(.8, 1.25, 1.5);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

@keyframes scaleInOut3d {
  0% {
    transform: scale3d(1, 1, 1);
  }
  50% {
    transform: scale3d(.8, 1.25, 1.5);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>
