import type { MemberTargetTimes, Time } from "@/models";

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

export const formatTargetTime = (targetTime: MemberTargetTimes) => {
  return formatTimeMS(targetTime?.minutes ?? 0, targetTime?.seconds ?? 0);
};

export const formatTimeFromSeconds = (totalSeconds: number) => {
  let hours = Math.floor(totalSeconds / 3600);
  if (hours > 24) {
    hours = hours - 24;
  }
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  return formatTimeNumber(hours) + ":" + formatTimeMS(minutes, seconds);
};

export const formatTimeNumber = (number: number) => {
  return number.toString().padStart(2, "0");
};
