import type {
  LandingSettings,
  TargetOutputItem,
  TargetProps,
  Time,
} from "@/models";
import {
  getSecondsFromTime,
  getSecondsFromTimeSMH,
  getTimeFromSeconds,
} from "./time-conversions";

export const getLandingTimeFromLandingSettings = (
  utcTime: Time,
  targets: TargetProps[],
  landingSettings: LandingSettings,
  rallyTimeMinutes: number
): Time => {
  //offset X seconds so people can receive the information and call
  const callTimeDelaySeconds = 30;

  let utcSeconds = utcTime.seconds;
  if (landingSettings.ignoreSeconds) {
    if (utcSeconds > callTimeDelaySeconds) utcSeconds += callTimeDelaySeconds;
    //round off the minute
    utcSeconds += 60 - (utcSeconds % 60);
  } else {
    utcSeconds += callTimeDelaySeconds;
  }

  const newUtc = {
    ...utcTime,
    seconds: utcSeconds,
  };

  const totalUtcSeconds = getSecondsFromTime(newUtc);

  const firstLandSecondsNoRally = targets.reduce((acc, target) => {
    return Math.max(acc, target.totalSeconds);
  }, 0);

  const firstLandSeconds =
    totalUtcSeconds + firstLandSecondsNoRally + rallyTimeMinutes * 60;
  const firstLandingTime = getTimeFromSeconds(firstLandSeconds);

  const withLandingSeconds = getSecondsFromTimeSMH(
    landingSettings.turretStrikeSeconds,
    firstLandingTime.minutes,
    firstLandingTime.hours
  );

  let landingTime = getTimeFromSeconds(withLandingSeconds);
  if (withLandingSeconds < totalUtcSeconds) {
    landingTime = getTimeFromSeconds(withLandingSeconds + 60);
  }
  return landingTime;
};

export const getLaunchTimeFromLandingSettings = (
  targets: TargetProps[],
  landingSettings: LandingSettings,
  rallyTimeMinutes: number
): TargetOutputItem[] => {
  const utcArrivalTotalSeconds = getSecondsFromTime(
    landingSettings.landingTime
  );
  // console.trace("targets", JSON.parse(JSON.stringify(targets)));
  // const utcArrivalTime = getTimeFromSeconds(utcArrivalTotalSeconds);

  const rallyTime = getSecondsFromTime({
    hours: 0,
    minutes: rallyTimeMinutes,
    seconds: 0,
  });

  const maxAddedSeconds = Math.max(
    ...targets.map((target) => target.addedSecondsOffset)
  );

  const memberLaunchTimes = targets.map((target): TargetOutputItem => {
    const launchTime = calculateLaunchFromArrivalTime(
      utcArrivalTotalSeconds,
      rallyTime,
      target.totalSeconds,
      target.addedSecondsOffset,
      maxAddedSeconds
    );
    return {
      memberName: target.target.memberName,
      time: launchTime,
      totalSeconds: getSecondsFromTime(launchTime),
    };
  });
  return memberLaunchTimes;
  // return {
  //   launchTimes: memberLaunchTimes,
  //   landingTime: utcArrivalTime,
  // };
};

const calculateLaunchFromArrivalTime = (
  utcArrivalTotalSeconds: number,
  rallyTime: number,
  marchTotalSeconds: number,
  addedSeconds: number,
  maxMemberAddedSeconds: number
) => {
  /*
  To calculate launch time based on landing time...
  CT = time for caller to call
  T = Time provided by user (arrival time - rally time (offset))
  MT = March Time
  S = offset by seconds (staggering landing times)

  CT = T - MT + S
  */

  const memberMarchTime =
    marchTotalSeconds - maxMemberAddedSeconds + (addedSeconds ?? 0);

  const launchTimeSeconds =
    utcArrivalTotalSeconds - rallyTime - memberMarchTime;
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
