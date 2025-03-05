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
  return [
    {
      id: 0 + startIndex,
      targetName: "West Turret",
      minutes: times[0].minutes,
      seconds: times[0].seconds,
    },
    {
      id: 1 + startIndex,
      targetName: "Sunfire Castle",
      minutes: times[1].minutes,
      seconds: times[1].seconds,
    },
    {
      id: 2 + startIndex,
      targetName: "North Turret",
      minutes: times[2].minutes,
      seconds: times[2].seconds,
    },
    {
      id: 3 + startIndex,
      targetName: "East Turret",
      minutes: times[3].minutes,
      seconds: times[3].seconds,
    },
    {
      id: 4 + startIndex,
      targetName: "South Turret",
      minutes: times[4].minutes,
      seconds: times[4].seconds,
    },
  ];
};

export const testMemberData: Member[] = [
  {
    ...defaultMember,
    name: "Hectic",
    order: 10,
    id: 1,
    isSelected: true,
    targetTimes: setTargets(0, [
      { minutes: 0, seconds: 0 },
      { minutes: 0, seconds: 34 },
      { minutes: 0, seconds: 36 },
      { minutes: 0, seconds: 59 },
      { minutes: 0, seconds: 51 },
    ]),
  },
  {
    ...defaultMember,
    name: "Snow",
    order: 20,
    id: 2,
    isSelected: true,
    group: "",
    targetTimes: setTargets(5, [
      { minutes: 0, seconds: 0 },
      { minutes: 0, seconds: 31 },
      { minutes: 0, seconds: 32 },
      { minutes: 0, seconds: 49 },
      { minutes: 0, seconds: 41 },
    ]),
  },
  {
    ...defaultMember,
    name: "Neg",
    order: 5,
    id: 3,
    isSelected: true,
    group: "",
    targetTimes: setTargets(10, [
      { minutes: 0, seconds: 0 },
      { minutes: 0, seconds: 34 },
      { minutes: 0, seconds: 33 },
      { minutes: 0, seconds: 51 },
      { minutes: 1, seconds: 22 },
    ]),
  },
];
