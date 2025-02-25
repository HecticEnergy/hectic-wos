import { defineStore } from "pinia";
import { LocalStorage } from "@/services/local-storage-typed";
import type {
  Time,
  LandingSettings,
  LaunchSettings,
  MemberTarget,
} from "@/models";
import {
  addUtcTimeLaunch,
  correctHMS,
  getOffsetUtcTime,
  getUpdatedLandingTimeFromLaunch,
  sortAndPrepTargets,
} from "@/services/time-helpers";

const localStorageKey = "march-settings-lsk";
const getLocalStorageInstance = () => {
  return new LocalStorage<MarchSettings>(localStorageKey, defaultMarchSettings);
};
export const rallyMinuteOptions = [
  "0",
  "1",
  "2",
  "5",
  "10",
  "15",
  "20",
  "30",
  "60",
];
export type MarchSettingsType = "launch" | "landing";

export type MarchSettings = {
  marchSettingsType: MarchSettingsType;
  //TODO: Selected Target
  launchSettings: LaunchSettings;
  landingSettings: LandingSettings;
};
const defaultMarchSettings: MarchSettings = {
  marchSettingsType: "launch" as MarchSettingsType,
  launchSettings: {
    ignoreSeconds: true,
    separateSeconds: { seconds: 2 } as Time,
    launchTimeOffset: { minutes: 1, seconds: 0 } as Time,
  },
  landingSettings: {
    ignoreSeconds: true,
    rallyTimeMinutesIndex: 3,
    separateSeconds: { seconds: 2 } as Time,
    landingTime: { hours: 0, minutes: 0, seconds: 0 } as Time,
  },
};

export const useMarchSettingStore = defineStore("MarchSetting", {
  state: () =>
    ({
      ...defaultMarchSettings,
    } as MarchSettings),

  getters: {
    rallyTimeTicks: () => {
      const obj = {};
      rallyMinuteOptions.forEach((val, idx) => {
        //@ts-expect-error - obj[idx] is a number
        obj[idx] = val;
      });
      return obj;
    },
    rallyTimeMinutes: (state) =>
      parseInt(rallyMinuteOptions[state.landingSettings.rallyTimeMinutesIndex]),
  },

  actions: {
    loadData() {
      const storage = getLocalStorageInstance();
      const data = storage.load();
      if (data) {
        this.$state = data;
      }
    },
    saveData() {
      const storage = getLocalStorageInstance();
      this.cleanData();
      storage.save(JSON.parse(JSON.stringify(this.$state)));
    },
    cleanData() {
      const launchSettingsTO = this.launchSettings.launchTimeOffset;
      const correctedLsto = correctHMS(launchSettingsTO);
      this.launchSettings.launchTimeOffset = {
        ...correctedLsto,
        hours: undefined,
      } as unknown as Time;

      const landingSettingsTO = this.landingSettings.landingTime;
      this.landingSettings.landingTime = correctHMS(landingSettingsTO);
    },
    refreshLandingTime(maxMarchSeconds: number) {
      const currentUtcTime = getOffsetUtcTime(
        new Date(),
        this.rallyTimeMinutes,
        this.landingSettings.separateSeconds.seconds + maxMarchSeconds,
        this.landingSettings.ignoreSeconds
      );
      this.landingSettings.landingTime = currentUtcTime;
    },
    getMaxMarchSeconds(selectedTargets: MemberTarget[]) {
      return sortAndPrepTargets(selectedTargets).reduce((acc, target) => {
        return Math.max(acc, target.totalSeconds);
      }, 0);
    },
    getUpdatedLandingTimeFromLaunch(selectedTargets: MemberTarget[]) {
      const maxMarchSeconds = this.getMaxMarchSeconds(selectedTargets);
      const updatedLanding = getUpdatedLandingTimeFromLaunch(
        new Date(),
        maxMarchSeconds,
        this.landingSettings,
        this.rallyTimeMinutes
      );
      return updatedLanding;
    },
    getLandingRallyStartTime(selectedTargets: MemberTarget[]) {
      const startTime = addUtcTimeLaunch(selectedTargets, new Date(), {
        ignoreSeconds: this.landingSettings.ignoreSeconds,
        separateSeconds: this.landingSettings.separateSeconds,
        launchTimeOffset: { hours: 0, minutes: 0, seconds: 0 },
      });
      return startTime;
    },
  },
});
