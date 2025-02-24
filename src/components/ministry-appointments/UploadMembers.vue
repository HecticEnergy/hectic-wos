<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-textarea
          v-model="memberData"
          rows="7"
          clearable
          label="Member Data"
          focused
          placeholder="hectic
troop speedups: 22d12m
Construction: 12 days
Research: 354h 65  minutes
FC: 3,000
18UTC - 20:00, 23:00-4"
        />
      </v-col>
      <v-col cols="12">
        <v-row class="d-flex justify-space-between">
          <v-col cols="auto">
            <v-btn
              color="primary"
              :disabled="!memberData.trim().length"
              @click="() => parseText(memberData)"
            >
              upload
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              color="primary"
              :disabled="!!ministryMemberStore.members.length"
              @click="() => ministryMemberStore.loadTestData()"
            >
              Load Test
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              prepend-icon="mdi-trash-can"
              color="error"
              :disabled="!ministryMemberStore.members.length"
              @click="() => ministryMemberStore.clearData()"
            >
              Data
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  useMinistryMemberStore,
  type MinistryMember,
  type TimeHM,
  type TimeRange,
} from "./ministry-member-store";
import { getTimeFromMHD } from "@/services/time-helpers";
import { useAlertStore } from "@/stores/alert-store";

const ministryMemberStore = useMinistryMemberStore();
const alertStore = useAlertStore();

const memberData = ref<string>(`hectic
troop speedups: 22d12m
Construction: 12 days
Research: 354h 65  minutes
FC: 3,000
18UTC - 20:00, 23:00-4`);

const error = (msg: string) => {
  // console.error(msg);
  alertStore.error(msg);
};

const parseText = (memberInfo: string) => {
  const memberInfoLines = memberInfo.split("\n").filter((l) => !!l.trim());

  // console.log("MemberInfoLines", memberInfoLines);
  if (memberInfoLines.length < 2)
    error("at least 2 lines are required to parse");

  let memberName = memberInfoLines.shift()!.trim();

  if (memberName[-1] === ":")
    memberName = memberName.substring(0, memberName.length - 1);

  // console.log("memberName", memberName);

  const memberAvailableTimesRaw = memberInfoLines.pop()!.trim();
  // console.log("memberAvailableTimesRaw", memberAvailableTimesRaw);

  const timeRanges = parseTimes(memberAvailableTimesRaw);
  // console.log("timeRanges", timeRanges);
  //   console.log("MemberInfoLines", memberInfoLines);

  const parsedDataItems = memberInfoLines.flatMap((line) => {
    const parsedData = [];
    const match = line.matchAll(/(?<itemType>.*?):?\s?(?<qtys>\d.*)/gi);
    for (const m of match) {
      // console.log("match", m, m.index);
      if (!m.groups) {
        error("Unable to parse member target data.");
        return [];
      }
      // console.log("parsed Data groups", m.groups);

      const times = parseQuantities(m.groups["qtys"]);

      parsedData.push({
        itemType: m.groups["itemType"],
        ...times,
      });
    }
    return parsedData;
  });

  // console.log("parsedDataItems", parsedDataItems);
  const speedups = parseSpeedups(
    parsedDataItems as unknown as parserSpeedupItem[]
  );
  const member = {
    id: -1,
    name: memberName,
    timeRanges: timeRanges,
    ...speedups,
  } as unknown as MinistryMember;

  // console.log("imported from", memberInfo);
  // console.log("parsed to", JSON.parse(JSON.stringify(member)));
  ministryMemberStore.addMember(member);
};

type Interval = "days" | "hours" | "minutes";
const parseQuantities = (quantitiesStr: string) => {
  const matches = quantitiesStr.matchAll(
    /(?<qty>(\d[\.,\s]*)+)(?<qtyType>((d(ays?)?)|(h(ours?)?)|(m(inutes?)?)))?/gi
  );

  const quantities: IDictionary<number> = {
    days: 0,
    hours: 0,
    minutes: 0,
  };

  const getInterval = (interval: string): Interval => {
    switch (interval?.toLowerCase().trim()[0]) {
      case "d":
        return "days";
      case "h":
        return "hours";
      case "m":
        return "minutes";
      default:
        return "days";
    }
  };

  for (const match of matches) {
    if (!match.groups) {
      error("Unable to parse quantities.");
      return quantities;
    }

    const qtyGroup = match.groups["qty"];
    const qtyClean = qtyGroup.replace(/[\.,\s*]/g, "");
    const qty = Number.parseInt(qtyClean);
    const qtyType = getInterval(match.groups["qtyType"]);
    quantities[qtyType] = qty;
    // console.log("parsed qty", qtyGroup, qtyClean, qty, qtyType, match.groups);
  }

  const time = getTimeFromMHD(
    quantities.minutes,
    quantities.hours,
    quantities.days
  );

  // console.log("converted quantities", quantities, time);

  return {
    ...quantities,
    ...time,
  };
};

type parserSpeedupItem = {
  itemType: string;
  days: number;
  hours: number;
  minutes: number;
};
const parseSpeedups = (dataItems: parserSpeedupItem[]) => {
  const types: IDictionary<string> = {
    c: "constructionSpeedups",
    r: "researchSpeedups",
    t: "troopSpeedups",
    f: "fireCrystals",
  };

  const getItemFromType = (
    type: string,
    items: parserSpeedupItem[]
  ): parserSpeedupItem => {
    const foundItem = items.find(
      (i) => types[i.itemType.toLocaleLowerCase().trim()[0]] === type
    ) || {
      itemType: type,
      days: 0,
      hours: 0,
      minutes: 0,
    };
    return foundItem;
  };

  return {
    constructionSpeedups: getItemFromType(types.c, dataItems),
    researchSpeedups: getItemFromType(types.r, dataItems),
    troopSpeedups: getItemFromType(types.t, dataItems),
    fireCrystals: getItemFromType(types.f, dataItems).days,
  };
};

const parseTimes = (inputLine: string) => {
  //Not sure why this easier to read version isn't working...
  // let timePartRegex = "\d?\d(:\d\d)?(utc)?";
  // //(\d?\d(:\d\d)?(utc)?(\s*-\s*\d?\d(:\d\d)?(utc)?)?,?)+
  // let timesRegexString = `(${timePartRegex}(\s*-\s*${timePartRegex})?,?)+`;
  // const timesRegex = new RegExp(timesRegexString, "gi");

  const timeRangeMatches = inputLine.matchAll(
    /((?<start>\d?\d(:\d\d)?)(utc)?(\s*-\s*(?<end>\d?\d(:\d\d)?)(utc)?)?,?)+/gi
  );

  const parsedRanges: { start: string; end: string }[] = [];

  for (const timeRange of timeRangeMatches) {
    if (!timeRange.groups) {
      error("Unable to parse time range.");
      return [];
    }

    const start = timeRange.groups["start"];
    const end = timeRange.groups["end"];
    parsedRanges.push({ start, end });
  }

  return parsedRanges.map((r) => {
    const startTime = parseTimeHM(r.start);
    const endTime = parseTimeHM(r.end);
    return { start: startTime, end: endTime } as TimeRange;
  });
};

const parseTimeHM = (time: string): TimeHM => {
  const timeParts = time.split(":");
  const hours = Number.parseInt(timeParts[0]);
  const minutes = timeParts.length > 1 ? Number.parseInt(timeParts[1]) : 0;
  return { hours, minutes } as TimeHM;
};
</script>
