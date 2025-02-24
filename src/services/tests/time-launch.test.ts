import { expect, test, describe } from "vitest";
import type { LaunchSettings, TargetProps } from "@/models";
import { getLaunchTime } from "../time-helpers/time-launch";

const getMemberTarget = (
  minutes?: number,
  seconds?: number,
  secondsOffset?: number,
  name?: string,
  order?: number
): TargetProps => {
  const target = {
    memberName: name ?? "member1",
    order: order ?? 1,
    minutes: minutes ?? 0,
    seconds: seconds ?? 0,
  };

  const memberTarget: TargetProps = {
    addedSecondsOffset: secondsOffset ?? 0,
    target: target,
    totalSeconds: target.minutes * 60 + target.seconds,
  };
  return memberTarget;
};

const launchSettings_default: LaunchSettings = {
  ignoreSeconds: false,
  separateSeconds: { hours: 0, minutes: 0, seconds: 0 },
  launchTimeOffset: { hours: 0, minutes: 0, seconds: 0 },
};

describe("getLandingTime", () => {
  test("should add utc time to launch - zeros", () => {
    //prepare the input
    const utcTime = new Date("2021-11-12T00:00:00Z");
    const memberTargets = [getMemberTarget(0, 0, 0, "member1", 1)];
    const launchSettings = { ...launchSettings_default };

    //what do you expect the output to be?
    const expected = [
      {
        time: {
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        memberName: "member1",
      },
    ];
    //do the action
    const actual = getLaunchTime(memberTargets, utcTime, launchSettings);
    //run the test
    expect(actual).toEqual(expected);
  });
  test("should add utc time to launch - offset 1:20", () => {
    //prepare the input
    const utcTime = new Date("2021-11-12T00:00:00Z");
    const memberTargets = [getMemberTarget(0, 0, 0, "member1", 1)];
    const launchSettings = {
      ...launchSettings_default,
      launchTimeOffset: { hours: 0, minutes: 1, seconds: 20 },
    };

    //what do you expect the output to be?
    const expected = [
      {
        time: {
          hours: 0,
          minutes: 1,
          seconds: 20,
        },
        memberName: "member1",
      },
    ];
    //do the action
    const actual = getLaunchTime(memberTargets, utcTime, launchSettings);
    //run the test
    expect(actual).toEqual(expected);
  });

  test("should add utc time to launch - offset 1:20 20 second delay", () => {
    //prepare the input
    const utcTime = new Date("2021-11-12T00:00:00Z");
    const memberTargets = [
      getMemberTarget(0, 0, 0, "member1", 10),
      getMemberTarget(0, 0, 20, "member2", 20),
    ];
    const launchSettings = {
      ...launchSettings_default,
      launchTimeOffset: { hours: 0, minutes: 1, seconds: 20 },
      separateSeconds: { hours: 0, minutes: 0, seconds: 20 },
    };

    //what do you expect the output to be?
    const expected = [
      {
        memberName: "member1",
        time: {
          hours: 0,
          minutes: 1,
          seconds: 20,
        },
      },
      {
        memberName: "member2",
        time: {
          hours: 0,
          minutes: 1,
          seconds: 0,
        },
      },
    ];
    //do the action
    const actual = getLaunchTime(memberTargets, utcTime, launchSettings);
    //run the test
    expect(actual).toEqual(expected);
  });
});
