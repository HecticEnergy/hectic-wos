import type {
  LandingSettings,
  TargetOutputItem,
  TargetProps,
  Time,
} from "@/models";
import { getSecondsFromTime, getTimeFromSeconds } from "./time-conversions";

export const getLandingTime = (
  targets: TargetProps[],
  landingSettings: LandingSettings,
  rallyTimeMinutes: number
): TargetOutputItem[] => {
  const utcArrivalTotalSeconds = getSecondsFromTime(
    landingSettings.landingTime
  );
  const offsetTotalSeconds = getSecondsFromTime({
    hours: 0,
    minutes: rallyTimeMinutes,
    seconds: 0,
  });

  const memberLandingTimes = targets.map((target) => {
    const launchTime = calculateLaunchFromArrivalTime(
      utcArrivalTotalSeconds,
      offsetTotalSeconds,
      target.totalSeconds,
      target.addedSecondsOffset
    );
    return {
      memberName: target.target.memberName,
      time: launchTime,
    };
  });
  return memberLandingTimes;
};

const calculateLaunchFromArrivalTime = (
  utcArrivalTotalSeconds: number,
  offsetTotalSeconds: number,
  marchTotalSeconds: number,
  addedSeconds: number
) => {
  /*
  To calculate launch time based on landing time...
  CT = time for caller to call
  T = Time provided by user (arrival time - rally time (offset))
  MT = March Time
  S = offset by seconds (staggering landing times)

  CT = T - MT + S
  */

  const memberMarchTime = marchTotalSeconds + (addedSeconds ?? 0);

  const launchTimeSeconds =
    utcArrivalTotalSeconds - offsetTotalSeconds - memberMarchTime;
  const time = getTimeFromSeconds(launchTimeSeconds);
  return time;
};

export const calculateMinLandingTime = (
  utcTime: Time,
  marchInSeconds: number,
  rallyTimeMinutes: number,
  roundSeconds: boolean = false
): Time => {
  const utcTotalSeconds =
    getSecondsFromTime(utcTime) + (roundSeconds ? 60 - utcTime.seconds : 0);
  const rallyTimeTotalSeconds = rallyTimeMinutes * 60;
  const groupTargetedArrivalTime =
    utcTotalSeconds + marchInSeconds + rallyTimeTotalSeconds;
  const time = getTimeFromSeconds(groupTargetedArrivalTime);
  return time;
};
