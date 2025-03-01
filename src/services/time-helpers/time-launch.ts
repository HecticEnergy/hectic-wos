import type {
  LaunchSettings,
  TargetOutputItem,
  TargetProps,
  Time,
} from "@/models";
import {
  getSecondsFromTime,
  getSecondsFromTimeSMH,
  getTimeFromSeconds,
  getUtcTime,
} from "./time-conversions";

//Get First Arrival Time

//get all arrival times
export const getLaunchTime = (
  sortedTargetsExtraProps: TargetProps[],
  date: Date,
  launchSettings: LaunchSettings
): TargetOutputItem[] => {
  const utcTime = getUtcTime(date);
  const utcTotalSeconds = getSecondsFromTime(utcTime);
  const utcTotalSecAdj =
    utcTotalSeconds + (launchSettings.ignoreSeconds ? 60 - utcTime.seconds : 0);

  const offsetInSeconds = getSecondsFromTimeSMH(
    launchSettings.launchTimeOffset.seconds,
    launchSettings.launchTimeOffset.minutes
  );

  // Find max march time
  const maxMemberTime = Math.max(
    ...sortedTargetsExtraProps.map((target) => target.totalSeconds + target.addedSecondsOffset)
  );

  // Calculate the landing time for each member
  const memberTimes = sortedTargetsExtraProps.map((target) => {
    const launchTime = calculateTimeToLaunch(
      utcTotalSecAdj,
      offsetInSeconds,
      target.totalSeconds,
      maxMemberTime,
      target.addedSecondsOffset
    );

    return {
      memberName: target.target.memberName,
      time: launchTime,
      totalSeconds: target.totalSeconds,
    };
  });

  return memberTimes;
};

const calculateTimeToLaunch = (
  utcTotalSeconds: number,
  offsetInTotalSeconds: number,
  marchInSeconds: number,
  maxMarchInSeconds: number,
  addedSeconds?: number
): Time => {
  // console.log('CalcTimeAndThings', offsetInTotalSeconds, marchInSeconds, maxMarchInSeconds, addedSeconds);
  //targetArrivalTime does not include rally time
  const groupTargetedArrivalTime =
    utcTotalSeconds + offsetInTotalSeconds + maxMarchInSeconds;
  const memberMarchTime = marchInSeconds + (addedSeconds ?? 0);
  const launchTimeSeconds = groupTargetedArrivalTime - memberMarchTime;

  const time = getTimeFromSeconds(launchTimeSeconds);
  // console.log("time", time);
  return time;
};
