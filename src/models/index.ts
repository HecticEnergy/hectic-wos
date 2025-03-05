export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type MemberTarget = {
  memberName: string;
  order: number;
  minutes: number;
  seconds: number;
};

export type TargetProps = {
  target: MemberTarget;
  totalSeconds: number;
  addedSecondsOffset: number;
};

export type TargetOutputItem = {
  memberName: string;
  time: Time;
  totalSeconds: number;
};

export type MemberTargetTimes = {
  id: number;
  targetName: string;
  minutes: number;
  seconds: number;
};

export type Member = {
  id: number;
  order: number;
  name: string;
  targetType: TargetMode;
  targetTimes: MemberTargetTimes[];
  isSelected: boolean;
  group: string;
  //separateSeconds: Time;
};

export type LaunchSettings = {
  ignoreSeconds: boolean;
  separateSeconds: Time;
  launchTimeOffset: Time;
};

export type LandingSettings = {
  ignoreSeconds: boolean;
  rallyTimeMinutesIndex: number;
  separateSeconds: Time;
  landingTime: Time;
};


export const SfcTargets = [
  "Sunfire Castle",
  "North Turret",
  "East Turret",
  "South Turret",
  "West Turret",
] as const;

export type SfcTarget = typeof SfcTargets[number];

export const targetModes = ["Sunfire Castle", "Single Target"] as const;
export type TargetMode = typeof targetModes[number];