import { expect, test, describe } from "vitest";
import type { LandingSettings, TargetProps } from "@/models";
import {
  calculateMinLandingTime,
  getLandingTimeFromLandingSettings,
  getLaunchTimeFromLandingSettings,
} from "../time-helpers/time-landing";

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

const landingSettings_default: LandingSettings = {
  ignoreSeconds: false,
  landingTime: { hours: 0, minutes: 0, seconds: 0 },
  separateSeconds: { hours: 0, minutes: 0, seconds: 0 },
  rallyMinutes: 0,
  turretStrikeSeconds: 0,
};

describe("getLaunchTimeFromLandingSettings - should deduct to calculate launch", () => {
  test("zeros", () => {
    //prepare the input
    const memberTargets = [getMemberTarget(0, 0, 0, "member1", 1)];
    const landingSettings = { ...landingSettings_default };

    //what do you expect the output to be?
    const expected = [
      {
        time: {
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        memberName: "member1",
        totalSeconds: 0,
      },
    ];
    //do the action
    const actual = getLaunchTimeFromLandingSettings(
      memberTargets,
      landingSettings,
      0
    );
    //run the test
    expect(actual).toEqual(expected);
  });
  test("target arrival 1:20, 0:10 march", () => {
    //prepare the input
    const memberTargets = [getMemberTarget(0, 10, 0, "member1", 1)];
    const landingSettings = {
      ...landingSettings_default,
      landingTime: { hours: 0, minutes: 1, seconds: 20 },
    };

    //what do you expect the output to be?
    const expected = [
      {
        time: {
          hours: 0,
          minutes: 1,
          seconds: 10,
        },
        memberName: "member1",
        totalSeconds: 70,
      },
    ];
    //do the action
    const actual = getLaunchTimeFromLandingSettings(
      memberTargets,
      landingSettings,
      0
    );
    //run the test
    expect(actual).toEqual(expected);
  });
  test("target arrival 10:00, 0:10 march, rallyTime 5", () => {
    //prepare the input
    const memberTargets = [getMemberTarget(0, 10, 0, "member1", 1)];
    const landingSettings = {
      ...landingSettings_default,
      
      landingTime: { hours: 0, minutes: 10, seconds: 0 },
    };

    //what do you expect the output to be?
    const expected = [
      {
        time: {
          hours: 0,
          minutes: 4,
          seconds: 50,
        },
        memberName: "member1",
        totalSeconds: 290,
      },
    ];
    //do the action
    const actual = getLaunchTimeFromLandingSettings(
      memberTargets,
      landingSettings,
      5
    );
    //run the test
    expect(actual).toEqual(expected);
  });

  test("target arrival 10:00, 0:10 & 0:20 march, rallyTime 5", () => {
    //prepare the input
    const memberTargets = [
      getMemberTarget(0, 10, 0, "member1", 1),
      getMemberTarget(0, 20, 2, "member2", 2),
    ];
    const landingSettings = {
      ...landingSettings_default,
      landingTime: { hours: 0, minutes: 10, seconds: 0 },
    };

    //what do you expect the output to be?
    const expected = [
      {
        time: {
          hours: 0,
          minutes: 4,
          seconds: 52,
        },
        memberName: "member1",
        totalSeconds: 292,
      },
      {
        time: {
          hours: 0,
          minutes: 4,
          seconds: 40,
        },
        memberName: "member2",
        totalSeconds: 280,
      },
    ];
    //do the action
    const actual = getLaunchTimeFromLandingSettings(
      memberTargets,
      landingSettings,
      5
    );
    //run the test
    expect(actual).toEqual(expected);
  });
});

describe("calculateMinLandingTime", () => {
  test("should calculate min landing time", () => {
    //prepare the input
    const utcTime = { hours: 0, minutes: 0, seconds: 0 };
    const rallyTimeMinutes = 5;
    const marchInSeconds = 10;
    const roundSeconds = false;

    //what do you expect the output to be?
    const expected = {
      hours: 0,
      minutes: 5,
      seconds: 10,
    };
    //do the action
    const actual = calculateMinLandingTime(
      utcTime,
      marchInSeconds,
      rallyTimeMinutes,
      roundSeconds
    );
    //run the test
    expect(actual).toEqual(expected);
  });
  test("should calculate min landing time - round seconds", () => {
    //prepare the input
    const utcTime = { hours: 0, minutes: 0, seconds: 50 };
    const rallyTimeMinutes = 5;
    const marchInSeconds = 10;
    const roundSeconds = true;

    //what do you expect the output to be?
    const expected = {
      hours: 0,
      minutes: 6,
      seconds: 10,
    };
    //do the action
    const actual = calculateMinLandingTime(
      utcTime,
      marchInSeconds,
      rallyTimeMinutes,
      roundSeconds
    );
    //run the test
    expect(actual).toEqual(expected);
  });
});

describe("getLandingTimeFromLandingSettings", () => {
  test("should calculate landing time", () => {
    const utcTime = { hours: 0, minutes: 0, seconds: 0 };
    const landingSettings = { ...landingSettings_default };
    const rallyTimeMinutes = 5;
    const targets = [getMemberTarget(0, 0, 0, "member1", 1)];
    const expected = { hours: 0, minutes: 5, seconds: 0 };

    const actual = getLandingTimeFromLandingSettings(
      utcTime,
      targets,
      landingSettings,
      rallyTimeMinutes
    );
    expect(actual).toEqual(expected);
  });

  test("should calculate landing time - only care about first arrival", () => {
    const utcTime = { hours: 0, minutes: 0, seconds: 0 };
    const landingSettings = { ...landingSettings_default };
    const rallyTimeMinutes = 5;
    const targets = [
      getMemberTarget(0, 0, 0, "member1", 1),
      getMemberTarget(0, 0, 20, "member2", 2),
    ];
    const expected = { hours: 0, minutes: 5, seconds: 0 };

    const actual = getLandingTimeFromLandingSettings(
      utcTime,
      targets,
      landingSettings,
      rallyTimeMinutes
    );
    expect(actual).toEqual(expected);
  });

  test("should calculate landing time - 12 second turret time", () => {
    const utcTime = { hours: 0, minutes: 0, seconds: 0 };
    const landingSettings = {
      ...landingSettings_default,
      turretStrikeSeconds: 12,
    };
    const rallyTimeMinutes = 5;
    const targets = [getMemberTarget(0, 0, 0, "member1", 1)];
    const expected = { hours: 0, minutes: 5, seconds: 12 };

    const actual = getLandingTimeFromLandingSettings(
      utcTime,
      targets,
      landingSettings,
      rallyTimeMinutes
    );
    expect(actual).toEqual(expected);
  });

  test("should calculate landing time - ignore seconds, 12 second turret time", () => {
    const utcTime = { hours: 0, minutes: 0, seconds: 0 };
    const landingSettings = {
      ...landingSettings_default,
      ignoreSeconds: true,
      turretStrikeSeconds: 12,
    };
    const rallyTimeMinutes = 5;
    const targets = [getMemberTarget(0, 0, 0, "member1", 1)];
    const expected = { hours: 0, minutes: 6, seconds: 12 };

    const actual = getLandingTimeFromLandingSettings(
      utcTime,
      targets,
      landingSettings,
      rallyTimeMinutes
    );
    expect(actual).toEqual(expected);
  });
  test("should calculate landing time - 0:0:20 ignore seconds, 12 second turret time", () => {
    const utcTime = { hours: 0, minutes: 0, seconds: 20 };
    const landingSettings = {
      ...landingSettings_default,
      ignoreSeconds: true,
      turretStrikeSeconds: 12,
    };
    const rallyTimeMinutes = 5;
    const targets = [getMemberTarget(0, 0, 0, "member1", 1)];
    const expected = { hours: 0, minutes: 6, seconds: 12 };

    const actual = getLandingTimeFromLandingSettings(
      utcTime,
      targets,
      landingSettings,
      rallyTimeMinutes
    );
    expect(actual).toEqual(expected);
  });
  test("should calculate landing time - 0:0:50 ignore seconds, 12 second turret time", () => {
    const utcTime = { hours: 0, minutes: 0, seconds: 50 };
    const landingSettings = {
      ...landingSettings_default,
      ignoreSeconds: true,
      turretStrikeSeconds: 12,
    };
    const rallyTimeMinutes = 5;
    const targets = [getMemberTarget(0, 0, 0, "member1", 1)];
    const expected = { hours: 0, minutes: 7, seconds: 12 };

    const actual = getLandingTimeFromLandingSettings(
      utcTime,
      targets,
      landingSettings,
      rallyTimeMinutes
    );
    expect(actual).toEqual(expected);
  });
  test("should calculate landing time - 1:2 march, ignore seconds, 12 second turret time", () => {
    const utcTime = { hours: 0, minutes: 0, seconds: 0 };
    const landingSettings = {
      ...landingSettings_default,
      ignoreSeconds: true,
      turretStrikeSeconds: 12,
    };
    const rallyTimeMinutes = 5;
    const targets = [getMemberTarget(1, 2, 0, "member1", 1)];
    const expected = { hours: 0, minutes: 7, seconds: 12 };

    const actual = getLandingTimeFromLandingSettings(
      utcTime,
      targets,
      landingSettings,
      rallyTimeMinutes
    );
    expect(actual).toEqual(expected);
  });
  test("should calculate landing time - 5:2 march 2nd member, ignore seconds, 12 second turret time", () => {
    const utcTime = { hours: 0, minutes: 0, seconds: 0 };
    const landingSettings = {
      ...landingSettings_default,
      ignoreSeconds: true,
      turretStrikeSeconds: 12,
    };
    const rallyTimeMinutes = 5;
    const targets = [
      getMemberTarget(1, 2, 0, "member1", 1),
      getMemberTarget(5, 2, 20, "member2", 2),
    ];
    const expected = { hours: 0, minutes: 11, seconds: 12 };

    const actual = getLandingTimeFromLandingSettings(
      utcTime,
      targets,
      landingSettings,
      rallyTimeMinutes
    );
    expect(actual).toEqual(expected);
  });
});
