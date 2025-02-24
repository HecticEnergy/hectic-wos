import type { Member } from "@/models";


export const testMemberData: Member[] = [
  {
    name: "Hectic",
    order: 10,
    id: 1,
    isSelected: true,
    group: "",
    targetTimes: [
      {
        id: 6,
        targetName: "West",
        minutes: 0,
        seconds: 16,
      },
      {
        id: 6,
        targetName: "SFC",
        minutes: 0,
        seconds: 34,
      },
      {
        id: 6,
        targetName: "North",
        minutes: 0,
        seconds: 36,
      },
      {
        id: 6,
        targetName: "East",
        minutes: 0,
        seconds: 59,
      },
      {
        id: 6,
        targetName: "South",
        minutes: 0,
        seconds: 51,
      },
    ],
  },
  {
    name: "Snow",
    order: 20,
    id: 2,
    isSelected: true,
    group: "",
    targetTimes: [
      {
        id: 6,
        targetName: "West",
        minutes: 0,
        seconds: 22,
      },
      {
        id: 6,
        targetName: "SFC",
        minutes: 0,
        seconds: 31,
      },
      {
        id: 6,
        targetName: "North",
        minutes: 0,
        seconds: 32,
      },
      {
        id: 6,
        targetName: "East",
        minutes: 0,
        seconds: 49,
      },
      {
        id: 6,
        targetName: "South",
        minutes: 0,
        seconds: 41,
      },
    ],
  },
  {
    name: "Neg",
    order: 5,
    id: 3,
    isSelected: true,
    group: "",
    targetTimes: [
      {
        id: 6,
        targetName: "West",
        minutes: 0,
        seconds: 26,
      },
      {
        id: 6,
        targetName: "SFC",
        minutes: 0,
        seconds: 34,
      },
      {
        id: 6,
        targetName: "North",
        minutes: 0,
        seconds: 33,
      },
      {
        id: 6,
        targetName: "East",
        minutes: 0,
        seconds: 51,
      },
      {
        id: 6,
        targetName: "South",
        minutes: 1,
        seconds: 22,
      },
    ],
  },
];
