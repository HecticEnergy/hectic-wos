import type {
  MemberTarget,
  TargetOutputItem,
  TargetProps,
  Time,
} from "@/models";
import {
  getUtcTime,
  getOffsetUtcTime,
  getSecondsFromTimeSMH,
  getTimeFromSeconds,
  getSecondsFromTime,
  getTimeFromMHD,
} from "./time-helpers/time-conversions";

import {
  formatTime,
  formatTimeHMS,
  formatTimeFromSeconds,
} from "./time-helpers/time-formatters";
import type { LandingSettings, LaunchSettings } from "@/models";
import { getLaunchTime } from "./time-helpers/time-launch";
import {
  calculateMinLandingTime,
  getLandingTime,
} from "./time-helpers/time-landing";

export {
  getUtcTime,
  getSecondsFromTimeSMH,
  getTimeFromSeconds,
  getSecondsFromTime,
  getOffsetUtcTime,
  getTimeFromMHD,
  formatTime,
  formatTimeHMS,
  formatTimeFromSeconds,
};

export const correctHMS = (time: Time): Time => {
  const totalSeconds = getSecondsFromTime(time);
  const correctedTime = getTimeFromSeconds(totalSeconds);
  return correctedTime;
};

export const getOffsetUtcTimeFormatted = (
  offsetMinutes: number,
  offsetSeconds: number,
  ignoreSeconds: boolean = false
) => {
  const newTime = getOffsetUtcTime(
    new Date(),
    offsetMinutes,
    offsetSeconds,
    ignoreSeconds
  );
  return formatTimeHMS(newTime.hours, newTime.minutes, newTime.seconds);
};

export const deductFromUtcTimeLanding = (
  memberTargets: MemberTarget[],
  landingSettings: LandingSettings,
  rallyTimeMinutes: number
): TargetOutputItem[] => {
  const sortedTargets = sortAndPrepTargets(memberTargets);
  return getLandingTime(sortedTargets, landingSettings, rallyTimeMinutes);
};

export const getUpdatedLandingTimeFromLaunch = (
  utcDate: Date,
  maxMarchSeconds: number,
  landingSettings: LandingSettings,
  rallyTimeMinutes: number
): Time => {
  const utcTime = getUtcTime(utcDate);
  return calculateMinLandingTime(
    utcTime,
    maxMarchSeconds,
    rallyTimeMinutes,
    landingSettings.ignoreSeconds
  );
};

export const addUtcTimeLaunch = (
  memberTargets: MemberTarget[],
  date: Date,
  launchSettings: LaunchSettings
): TargetOutputItem[] => {
  const sortedTargetsExtraProps = sortAndPrepTargets(
    memberTargets,
    launchSettings.separateSeconds.seconds
  );

  return getLaunchTime(sortedTargetsExtraProps, date, launchSettings);
};

export const sortAndPrepTargets = (
  memberTargets: MemberTarget[],
  addedSeconds?: number
): TargetProps[] => {
  const sortedTargets = memberTargets.sort((a, b) => a.order - b.order);

  const sortedTargetsExtraProps = sortedTargets.map(
    (target, idx): TargetProps => {
      const addedSecondsOffset = (addedSeconds ?? 0) * idx;
      const totalSeconds = getSecondsFromTimeSMH(
        target.seconds,
        target.minutes
      );
      return { target, totalSeconds, addedSecondsOffset };
    }
  );

  return sortedTargetsExtraProps;
};
