import type { Time } from "@/models";

export const getUtcTime = (date: Date) => {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return { hours, minutes, seconds };
};

export const getOffsetUtcTime = (
  localTime: Date,
  offsetMinutes: number,
  offsetSeconds: number,
  ignoreSeconds: boolean = false
): Time => {
  const utcTimeObj = getUtcTime(localTime);
  const utcSeconds = ignoreSeconds ? 60 : utcTimeObj.seconds;

  const seconds = getSecondsFromTimeSMH(
    utcSeconds + offsetSeconds,
    utcTimeObj.minutes + offsetMinutes,
    utcTimeObj.hours
  );

  const time = getTimeFromSeconds(seconds);
  return time;
};

export const getSecondsFromTime = (time: Time) => {
  return (
    (time.hours ?? 0) * 3600 + (time.minutes ?? 0) * 60 + (time.seconds ?? 0)
  );
};

export const getSecondsFromTimeSMH = (
  seconds?: number,
  minutes?: number,
  hours?: number
) => {
  return getSecondsFromTime({
    hours: hours ?? 0,
    minutes: minutes ?? 0,
    seconds: seconds ?? 0,
  });
};

export const getTimeFromSeconds = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
};

export const getTimeFromMHD = (
  minutes: number,
  hours: number,
  days: number
) => {
  const totalMinutes = minutes + hours * 60 + days * 24 * 60;

  const newMinutes = totalMinutes % 60;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newDays = Math.floor(totalMinutes / (24 * 60));
  return { minutes: newMinutes, hours: newHours, days: newDays };
};
