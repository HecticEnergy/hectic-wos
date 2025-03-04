import type { MemberTargetTimes, Time } from "@/models";
import { getTimeFromSeconds } from "./time-conversions";

export const formatTimeNumber = (number: number) => {
  return number.toString().padStart(2, "0");
};

export const formatTimeHMS = (
  hours: number,
  minutes: number,
  seconds: number
) => {
  const hoursString = formatTimeNumber(hours);
  const minutesString = formatTimeNumber(minutes);
  const secondsString = formatTimeNumber(seconds);
  return `${hoursString}:${minutesString}:${secondsString}`;
};

export const formatTimeMS = (minutes: number | undefined, seconds: number) => {
  const minutesString = formatTimeNumber(minutes ?? 0);
  const secondsString = formatTimeNumber(seconds);
  return `${minutesString}:${secondsString}`;
};

export const formatTime = (time: Time) => {
  if (time.hours !== undefined) {
    return formatTimeHMS(time.hours, time.minutes, time.seconds);
  }
  if (time.minutes !== undefined) {
    return formatTimeMS(time.minutes, time.seconds);
  }
  if (time.seconds !== undefined) {
    return formatTimeNumber(time.seconds);
  }
};

export const formatTimeFromSeconds = (totalSeconds: number) => {
  const time = getTimeFromSeconds(totalSeconds);
  return formatTime(time);
};

export const formatTargetTime = (targetTime: MemberTargetTimes) => {
  return formatTimeMS(targetTime?.minutes ?? 0, targetTime?.seconds ?? 0);
};
