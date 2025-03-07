import type { Member, MemberTargetTimes } from "@/models";

const defaultMember: Member = {
  name: "",
  order: 0,
  id: 0,
  isSelected: false,
  targetType: "Sunfire Castle",
  group: "",
  targetTimes: [],
};

const setTargets = (
  startIndex: number,
  times: { minutes: number; seconds: number }[]
): MemberTargetTimes[] => {
  const targetNames = [
    "West Turret",
    "Sunfire Castle",
    "North Turret",
    "East Turret",
    "South Turret",
  ];

  const targets = targetNames.map((tn, i) => ({
    targetName: tn,
    minutes: times[i].minutes,
    seconds: times[i].seconds,
    id: i + startIndex,
  }));

  return targets;
};

const getTargetsRandomMarch = (startIndex: number): MemberTargetTimes[] => {
  const getNextSeconds = () => Math.floor(Math.random() * 50) + 10;

  return setTargets(startIndex, [
    { minutes: 0, seconds: 0 },
    { minutes: 0, seconds: getNextSeconds() },
    { minutes: 1, seconds: getNextSeconds() },
    { minutes: 1, seconds: getNextSeconds() },
    { minutes: 1, seconds: getNextSeconds() },
  ]);
};

const getTestMemberData = () => {
  const names = [
    "Hectic",
    "Snow",
    "Neg",
    "L6F",
    "Mofarch",
    "Ragnar",
    "Ironman",
    "Waco",
    "Jama",
    "Vin",
    "Mystic",
    "North",
    "South",
  ];
  const memberData = names.map((name, i) => ({
    ...defaultMember,
    name,
    order: i * 5,
    id: i + 1,
    isSelected: i < 3,
    targetTimes: getTargetsRandomMarch(i * 5),
  }));
  return memberData;
};

export const testMemberData: Member[] = getTestMemberData();
