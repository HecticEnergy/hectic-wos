import { defineStore } from "pinia";
import type { Member, MemberTarget } from "@/models";
import { correctHMS, getSecondsFromTimeSMH } from "@/services/time-helpers";
import { LocalStorage } from "@/services/local-storage-typed";

const localStorageKey = "march-members-lsk";

type MemberState = {
  members: Member[];
};

const defaultMemberData: MemberState = {
  members: [],
};

const getLocalStorageInstance = () => {
  return new LocalStorage<MemberState>(localStorageKey, defaultMemberData);
};

export const useMemberStore = defineStore("member-store", {
  state: () => ({
    // state
    members: [] as Member[],
    editMember: undefined as Member | undefined,
    groups: [] as string[],
    selectedGroups: [] as string[],
    selectedTargetName: "",
  }),
  getters: {
    nextMemberId: (state) => Math.max(...state.members.map(m => m.id)) + 1,
    nextOrder: (state) => Math.max(...state.members.map(m => m.order), 0) + 10,
    memberNames: (state) => state.members.map((m) => m.name),
    groupNames: (state) => state.groups,
    nextTargetId: (state) => {
      return state.members.flatMap((m) => m.targetTimes).length + 1;
    },
    allTargetNames: (state) => {
      return [
        ...new Set(
          state.members.flatMap((member) => {
            return member.targetTimes.map((tt) => tt.targetName);
          })
        ),
      ];
    },
  },
  actions: {
    // actions
    loadData() {
      //Save/Load Groups
      const loadedMembers = getLocalStorageInstance().load();
      if (!!loadedMembers && loadedMembers.members.length > 0) {
        console.log("Loaded members", loadedMembers);
        this.members = loadedMembers.members;
        this.updateGroups();

        this.setDefaultTarget();
      }
    },
    setDefaultTarget() {
      if (!this.allTargetNames.length) {
        this.selectedTargetName = "";
        return;
      }
      if (this.allTargetNames.length === 1 || this.selectedTargetName === "") {
        this.selectedTargetName = this.allTargetNames[0];
      }
    },
    updateGroups() {
      this.groups = [
        ...new Set(this.members.map((m) => m.group).filter((g) => !!g)),
      ];
      this.selectedGroups = this.selectedGroups.filter((g) =>
        this.groups.includes(g)
      );
    },
    add(member: Member) {
      this.members.unshift(member);
      if (this.editMember?.id === member.id) {
        this.editMember = undefined;
      }
      this.cleanData();
    },
    remove(id: number) {
      this.members = this.members.filter((member) => member.id !== id);
      if (this.editMember?.id === id) {
        this.editMember = undefined;
      }
      this.saveAll();
    },
    save(member: Member) {
      console.log("save: Members", this.members);
      this.validateMember(member);
      console.log("save: Validated", member);
      
      const index = this.members.findIndex((m) => m.id === member.id);
      if (index === -1) {
        this.add(member);
      } else {
        this.members[index] = member;
      }
      console.log("save: remove duplicates", this.members);
      this.editMember = undefined;
      this.saveAll();
    },
    saveAll() {
      this.cleanData();
      this.updateGroups();
      getLocalStorageInstance().save(this.$state);
      this.setDefaultTarget();

      //TODO Remove this - clearing out old local storage data
      localStorage.removeItem("members");
    },
    clearAllData() {
      this.members = [];
      this.saveAll();
    },
    validateMember(member: Member) {
      if (!member.name) {
        throw new Error("Name is required");
      }
      if (!member.targetTimes?.length) {
        throw new Error("At least one target time is required");
      }
      if (member.targetTimes.some((tt) => !tt.targetName)) {
        throw new Error("Target name is required");
      }
      if (member.targetTimes.some((tt) => tt.minutes < 0 || tt.seconds < 0)) {
        throw new Error("Invalid target time");
      }
      //no duplicate target names
      const targetNames = member.targetTimes.map((tt) => tt.targetName);
      if (new Set(targetNames).size !== targetNames.length) {
        throw new Error("Duplicate target names are not allowed");
      }
    },
    cleanData() {
      //TODO: Don't replace values inplace, create new [] and assign at the end
      const invalidTargetIds = this.members.filter((m) =>
        m.targetTimes.filter((tt) => tt.id < 0)
      );
      let targetId = this.nextTargetId;
      for (const invalidTargetId of invalidTargetIds) {
        for (const targetTime of invalidTargetId.targetTimes) {
          targetTime.id = targetId++;
        }
      }

      this.members.forEach((m) => {
        m.isSelected = m.isSelected ?? false;

        if (m.id < 0) {
          m.id = this.nextMemberId;
        }
        if (m.order < 0) {
          m.order = this.nextOrder;
        }

        const groupName = this.groups.find(
          (g) =>
            g.trim().toLocaleLowerCase() === m.group?.trim().toLocaleLowerCase()
        );
        m.group = groupName ?? m.group?.trim();

        m.targetTimes.forEach((tt) => {
          const targetName = this.allTargetNames.find(
            (tn) =>
              tn.trim().toLocaleLowerCase() ===
              tt.targetName?.trim().toLocaleLowerCase()
          );
          tt.targetName = targetName ?? tt.targetName?.trim();

          const targetTime = correctHMS({
            hours: 0,
            minutes: tt.minutes,
            seconds: tt.seconds,
          });
          tt.minutes = targetTime.minutes;
          tt.seconds = targetTime.seconds;
        });
      });

      this.members = this.members.sort((a, b) => a.order - b.order);
    },
    getMaxMarchSeconds(targetName?: string) {
      if (this.members.length === 0) {
        return 0;
      }
      if (this.allTargetNames.length > 1 && !!targetName) {
        return this.members.reduce((acc, member) => {
          const targetTime = member.targetTimes.find(
            (tt) =>
              tt.targetName.trim().toLocaleLowerCase() ===
              targetName.trim().toLocaleLowerCase()
          );
          if (!targetTime) {
            //TODO: This should return max of all target times
            return acc;
          }
          return Math.max(
            acc,
            getSecondsFromTimeSMH(targetTime.seconds, targetTime.minutes)
          );
        }, 0);
      }
      if (this.allTargetNames.length === 1) {
        return this.members.reduce((acc, member) => {
          const targetTime = member.targetTimes[0];
          return Math.max(
            acc,
            getSecondsFromTimeSMH(targetTime.seconds, targetTime.minutes)
          );
        }, 0);
      } else {
        return 0;
      }
    },
    getSelectedTargetTimes(selectedName: string) {
      return this.members
        .filter((member) => member.isSelected)
        .flatMap((member) =>
          member.targetTimes.filter(
            (tt) =>
              tt.targetName.trim().toLocaleLowerCase() ===
              selectedName.trim().toLocaleLowerCase()
          )
        );
    },
    getSelectedTargets(targetName?: string): MemberTarget[] {
      return this.members
        .filter((member) => member.isSelected)
        .flatMap((member) =>
          member.targetTimes
            .filter((tt) =>
              !!targetName
                ? tt.targetName.trim().toLocaleLowerCase() ===
                  targetName.trim().toLocaleLowerCase()
                : true
            )
            .map((tt) => ({
              memberName: member.name,
              order: member.order,
              ...tt,
            }))
        );
    },
    getSelectedMembers(groupName?: string) {
      return this.members
        .filter(
          (member) =>
            (!!groupName && member.group == groupName) ||
            (!groupName && member.isSelected)
        )
        .sort((a, b) => a.order - b.order);
    },
    getMembersByNames(names: string[]) {
      return this.members.filter((member) => names.includes(member.name));
    },
    getMemberSelectedTime(targetName: string, groupName?: string) {
      return this.getSelectedMembers(groupName)
        .map((m) => {
          const memberTime = m.targetTimes.find(
            (tt) =>
              tt.targetName.trim().toLocaleLowerCase() ===
              targetName!.trim().toLocaleLowerCase()
          );
          if (!memberTime) return undefined;

          return {
            memberName: m.name,
            order: m.order,
            minutes: memberTime.minutes,
            seconds: memberTime.seconds,
          };
        })
        .filter((m) => !!m);
    },
  },
});
