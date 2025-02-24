import { defineStore } from "pinia";
import { save, load, remove } from "@/services/local-storage";

const localStorageKey = "ministry-memberslsk";
/*
hectic
troop speedups: 22d
Construction: 12d
Research: 35d
FC: 380
18UTC - 20:00, 23:00-4

Snow
troop speedups: 100d
Construction: 35d
Research: 21d
FC: 2000
21:00-23:00

Apache
troop speedups: 65d
Construction: 25d
Research: 15d
FC: 3000
20:00-22:00

Trips
troop speedups: 45d
Construction: 15d
Research: 90d
FC: 1000
22:00-23:00, 4:00-5:00
*/

export type Speedup = {
  days: number;
  hours: number;
  minutes: number;
};

export type TimeHM = {
  hours: number;
  minutes: number;
};

export type TimeRange = {
  start: TimeHM;
  end: TimeHM;
};

export type MinistryMember = {
  id: number;
  name: string;
  constructionSpeedups: Speedup;
  researchSpeedups: Speedup;
  troopSpeedups: Speedup;
  fireCrystals: number;
  timeRanges: TimeRange[];
  isSelected?: boolean;
};

export const useMinistryMemberStore = defineStore("MinistryMember", {
  state: () => ({
    members: [] as MinistryMember[],
  }),

  getters: {
    hasSelectedMembers(state) {
      return state.members.some((m) => m.isSelected);
    },
  },

  actions: {
    loadData() {
      const data = load<MinistryMember[]>(localStorageKey);
      if (!!data) {
        this.members = data;
      }
      //
    },
    saveData() {
      if (this.members.length === 0) {
        remove(localStorageKey);
      }
      save(localStorageKey, this.members);
    },
    clearData() {
      this.members = [];
      this.saveData();
    },
    addMember(member: MinistryMember) {
      member.id = this.members.length + 1;
      this.members.push(member);
      // console.log("added member", member);
      this.saveData();
    },
    removeMember(id: number) {
      this.members = this.members.filter((m) => m.id !== id);
      this.saveData();
    },
    selectMemberToggle(id: number) {
      const member = this.members.find((m) => m.id === id);
      if (!member) throw new Error("Member not found");
      member.isSelected = !member.isSelected;
      this.saveData();
    },

    loadTestData() {
      this.members = [
        {
          id: 1,
          name: "Hectic",
          constructionSpeedups: { days: 12, hours: 0, minutes: 0 },
          researchSpeedups: { days: 35, hours: 0, minutes: 0 },
          troopSpeedups: { days: 22, hours: 0, minutes: 0 },
          fireCrystals: 3000,
          timeRanges: [
            {
              start: { hours: 18, minutes: 0 },
              end: { hours: 20, minutes: 0 },
            },
            { start: { hours: 23, minutes: 0 }, end: { hours: 4, minutes: 0 } },
          ],
        },
        {
          id: 2,
          name: "Snow",
          constructionSpeedups: { days: 35, hours: 0, minutes: 0 },
          researchSpeedups: { days: 21, hours: 0, minutes: 0 },
          troopSpeedups: { days: 100, hours: 0, minutes: 0 },
          fireCrystals: 2000,
          timeRanges: [
            {
              start: { hours: 21, minutes: 0 },
              end: { hours: 23, minutes: 0 },
            },
          ],
        },
        {
          id: 3,
          name: "Apache",
          constructionSpeedups: { days: 25, hours: 0, minutes: 0 },
          researchSpeedups: { days: 15, hours: 0, minutes: 0 },
          troopSpeedups: { days: 65, hours: 0, minutes: 0 },
          fireCrystals: 3000,
          timeRanges: [
            {
              start: { hours: 20, minutes: 0 },
              end: { hours: 22, minutes: 0 },
            },
          ],
        },
        {
          id: 4,
          name: "Trips",
          constructionSpeedups: { days: 15, hours: 0, minutes: 0 },
          researchSpeedups: { days: 90, hours: 0, minutes: 0 },
          troopSpeedups: { days: 45, hours: 0, minutes: 0 },
          fireCrystals: 1000,
          timeRanges: [
            {
              start: { hours: 22, minutes: 30 },
              end: { hours: 23, minutes: 0 },
            },
            { start: { hours: 4, minutes: 0 }, end: { hours: 5, minutes: 0 } },
          ],
        },
      ];
    },
  },
});
