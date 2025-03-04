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
  targetTimes: MemberTargetTimes[];
  isSelected: boolean;
  group: string;
  //separateSeconds: Time;
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

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export class cTime  {
  hours: number;
  minutes: number;
  seconds: number;

  constructor(hours: number, minutes: number, seconds: number) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }
}
