<template>
  <v-container>
    <v-select
      v-if="ministryMemberStore.members.length > 0"
      v-model="selectedSpeedupType"
      :items="speedupTypes"
      label="Speedup Type"
      compact
      hide-details
      class="my-4"
    />

    <v-table
      v-if="ministryMemberStore.members.length > 0"
      fixed-header
    >
      <thead>
        <tr>
          <th @click="sort('name')">
            Name
          </th>
          <th @click="sort('speedups')">
            {{ selectedSpeedupType }} Speedups
          </th>
          <th @click="sort('fc')">
            FC
          </th>
          <th
            class="text-right d-none d-sm-block"
            @click="sort('time')"
          >
            Time Ranges
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="member in ministryMemberStore.members"
          :key="member.id"
          :class="{ 'bg-grey': !!member.isSelected }"
          @click="() => ministryMemberStore.selectMemberToggle(member.id)"
        >
          <td>
            {{ member.name }}
          </td>
          <td v-if="selectedSpeedupType === 'Troop'">
            {{ formatSpeedupTitle(member.troopSpeedups) }}
          </td>
          <td v-else-if="selectedSpeedupType === 'Construction'">
            {{ formatSpeedupTitle(member.constructionSpeedups) }}
          </td>
          <td v-else-if="selectedSpeedupType === 'Research'">
            {{ formatSpeedupTitle(member.researchSpeedups) }}
          </td>
          <td v-else />
          <td>
            {{ member.fireCrystals }}
          </td>
          <td class="text-right d-none d-sm-block">
            {{ getTimeRanges(member) }}
          </td>
          <td class="text-right">
            <v-icon
              icon="mdi-close"
              color="error"
              @click.stop="() => ministryMemberStore.removeMember(member.id)"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
    <div v-if="!!ministryMemberStore.hasSelectedMembers">
      <MarchOutputDisplay
        :launch-time-output="ministryMemberOutput"
        unique-id="ministry-member-output"
        :hide-refresh="true"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import {
  useMinistryMemberStore,
  type MinistryMember,
  type Speedup,
  type TimeHM,
} from "./ministry-member-store";
import { computed, ref } from "vue";

const ministryMemberStore = useMinistryMemberStore();

const speedupTypes = ["Troop", "Construction", "Research"];
const selectedSpeedupType = ref<string>();

let lastSort: string = "";
let sortAsc = false;

// const sortedMembers = ref<MinistryMember[]>();

const sort = (sortByField: string) => {
  const members = [...ministryMemberStore.members];

  let sorted = members.sort((a: MinistryMember, b: MinistryMember) => {
    if (sortByField === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortByField === "speedups") {
      if (selectedSpeedupType.value === "Troop") {
        return a.troopSpeedups.days - b.troopSpeedups.days;
      } else if (selectedSpeedupType.value === "Construction") {
        return a.constructionSpeedups.days - b.constructionSpeedups.days;
      } else if (selectedSpeedupType.value === "Research") {
        return a.researchSpeedups.days - b.researchSpeedups.days;
      }
    } else if (sortByField === "fc") {
      return a.fireCrystals - b.fireCrystals;
    } else if (sortByField === "time") {
      //TODO - this doesn't work right...
      return getTimeRanges(a).localeCompare(getTimeRanges(b));
    }
    return 0;
  });

  sortAsc = lastSort === sortByField ? !sortAsc : false;
  sorted = sortAsc ? sorted : sorted.reverse();
  lastSort = sortByField;
  //   return sorted;
  ministryMemberStore.members = sorted;
};

const getTimeRanges = (member: MinistryMember, pad: boolean = true) => {
  const timeRanges = member.timeRanges
    ?.map(
      (timeRange) =>
        `${formatTime(timeRange.start, pad)}` +
        `-${formatTime(timeRange.end, pad)}`
    )
    .join(", ");
  return timeRanges;
};

const formatTime = (time: TimeHM, pad: boolean = true) => {
  const padNumber = pad ? 2 : 1;
  let formatted = `${(time.hours ?? "").toString().padStart(padNumber, "0")}`;
  if (time.minutes > 0)
    formatted += `:${(time.minutes ?? "").toString().padEnd(padNumber, "0")}`;
  return formatted;
};

const ministryMemberOutput = computed(() => {
  return ministryMemberStore.members
    .filter((m) => m.isSelected)
    .map((m) => `${getTimeRanges(m, false)} UTC - ${m.name}`)
    .join("\n");
});

const formatSpeedupTitle = (speedups: Speedup) => {
  let format = `${speedups.days}d`;
  if (speedups.hours > 0) format += ` ${speedups.hours}h`;
  if (speedups.minutes > 0) format += ` ${speedups.minutes}m`;
  return format;
};
</script>

<style scoped>
th,
tr {
  cursor: pointer;
}
th {
  font-weight: bold;
  font-size: 120%;
}
</style>
