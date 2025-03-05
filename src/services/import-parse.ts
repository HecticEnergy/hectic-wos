import type { Member, MemberTargetTimes } from "@/models";
import { formatTimeMS } from "./time-helpers/time-formatters";

export const parseTextMultipleTargets = (memberInfo: string, group: string) => {
  const memberInfoLines = memberInfo.split("\n").filter((l) => !!l.trim());

  // console.log("MemberInfoLines", memberInfoLines);
  if (memberInfoLines.length < 2)
    throw new Error("at least 2 lines are required to parse");

  let memberName = memberInfoLines.shift()!.trim();

  if (memberName[-1] === ":")
    memberName = memberName.substring(0, memberName.length - 1);

  //   console.log("memberName", memberName);
  //   console.log("MemberInfoLines", memberInfoLines);

  const targetTimes: MemberTargetTimes[] = memberInfoLines.flatMap((line) => {
    const parsedData: MemberTargetTimes[] = [];
    const match = line.matchAll(
      /(?<targetName>.*?):?\s(?<minutes>\d?\d)?:?(?<seconds>\d\d)/g
    );
    for (const m of match) {
      //   console.log("match", m, m.index);
      if (!m.groups) {
        throw new Error("Unable to parse member target data.");
        return [] as MemberTargetTimes[];
      }
      parsedData.push({
        id: -1,
        targetName: m.groups["targetName"],
        minutes: Number.parseInt(`${m.groups["minutes"] ?? "00"}`),
        seconds: Number.parseInt(`${m.groups["seconds"]}`),
      });
    }
    return parsedData;
  });

  const member: Member = {
    id: -1,
    order: -1,
    name: memberName,
    targetType: "Sunfire Castle",
    targetTimes: targetTimes,
    isSelected: true,
    group: group,
  };

  return member;
};

export const parseTextSingleTarget = (memberInfo: string, group: string) => {
  const memberInfoLines = memberInfo.split("\n").filter((l) => !!l.trim());

  // console.log("MemberInfoLines", memberInfoLines);
  if (memberInfoLines.length < 1)
    throw new Error("at least 1 line is required to parse");

  const parsedMembers: Member[] = memberInfoLines.flatMap((line) => {
    const parsedData: Member[] = [];
    const match = line.matchAll(
      /(?<memberName>.*?):?\s(?<minutes>\d?\d)?:?(?<seconds>\d\d)/g
    );
    for (const m of match) {
      //   console.log("match", m, m.index);
      if (!m.groups) {
        throw new Error("Unable to parse member target data.");
      }
      const member: Member = {
        id: -1,
        order: -1,
        targetType: "Single Target",
        name: m.groups["memberName"],
        isSelected: true,
        group: group,
        targetTimes: [
          {
            id: -1,
            targetName: "Target",
            minutes: Number.parseInt(`${m.groups["minutes"] ?? "00"}`),
            seconds: Number.parseInt(`${m.groups["seconds"]}`),
          },
        ],
      };
      parsedData.push(member);
    }
    return parsedData;
  });

  return parsedMembers;
};

type ImportTarget = {
  n: string;
  m: number;
  s: number;
};

type ImportMember = {
  type: "sfc" | "s";
  n: string;
  tt: ImportTarget[];
};

const shortenTargetName = (targetName: string) => {
  switch (targetName) {
    case "Sunfire Castle":
      return "SFC";
    case "North Turret":
      return "NT";
    case "East Turret":
      return "ET";
    case "South Turret":
      return "ST";
    case "West Turret":
      return "WT";
    default:
      return targetName;
  }
};

const hydrateTargetName = (shortName: string) => {
  switch (shortName) {
    case "SFC":
      return "Sunfire Castle";
    case "NT":
      return "North Turret";
    case "ET":
      return "East Turret";
    case "ST":
      return "South Turret";
    case "WT":
      return "West Turret";
    default:
      return shortName;
  }
};

export const memberFromQueryStringFormat = (input: string) => {
  const member: ImportMember = {
    type: "s",
    n: "",
    tt: [],
  };

  const urlParams = new URLSearchParams(input);

  if (urlParams.has("n")) member.n = urlParams.get("n")!;
  if (urlParams.has("type"))
    member.type = urlParams.get("type") === "sfc" ? "sfc" : "s";
  if (urlParams.has("tt")) {
    const targetTimesParams = new URLSearchParams(urlParams.get("tt")!);
    for (const [key, value] of targetTimesParams.entries()) {
      member.tt.push({
        n: hydrateTargetName(key),
        m: Number.parseInt(value.split("-")[0]),
        s: Number.parseInt(value.split("-")[1]),
      });
    }
  }

  const output: Member = {
    id: -1,
    order: -1,
    name: member.n,
    targetType: member.type === "sfc" ? "Sunfire Castle" : "Single Target",
    targetTimes: member.tt.map((t) => ({
      id: -1,
      targetName: hydrateTargetName(t.n),
      minutes: t.m,
      seconds: t.s,
    })),
    isSelected: true,
    group: "",
  };

  return output;
};

export const memberToQueryStringFormat = (member: Member) => {
  const outputMember: ImportMember = {
    type: member.targetType === "Sunfire Castle" ? "sfc" : "s",
    n: member.name,
    tt: member.targetTimes
      .filter((t) => t.minutes > 0 || t.seconds > 0)
      .map((t) => ({
        n: shortenTargetName(t.targetName),
        m: t.minutes,
        s: t.seconds,
      })),
  };

  const targetParams = new URLSearchParams();
  for (const t of outputMember.tt) {
    targetParams.append(`${t.n}`, `${t.m}-${t.s}`);
  }
  const memberParams = new URLSearchParams();
  memberParams.set("n", outputMember.n);
  if (outputMember.type === "sfc") memberParams.set("type", outputMember.type);
  memberParams.set("tt", targetParams.toString());

  const output = memberParams.toString();
  // console.log("output", output);
  return output;
};

export const formatMemberForImport = (member: Member) => {
  const output: string[] = [];

  output.push(member.name);

  member.targetTimes
    .filter((t) => t.minutes > 0 || t.seconds > 0)
    .forEach((t) => {
      output.push(`${t.targetName}: ${formatTimeMS(t.minutes, t.seconds)}`);
    });

  return output.join("\n");
};
