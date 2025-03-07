import { SfcTargets, type Member, type MemberTargetTimes } from "@/models";
import { correctHMS } from "./time-helpers";

export const validateTargets = (targets: MemberTargetTimes[] | undefined) => {
  if (!targets?.length) {
    throw new Error("At least one target time is required");
  }
  if (targets.some((tt) => !tt.targetName)) {
    throw new Error("Target name is required");
  }
  if (targets.some((tt) => tt.minutes < 0 || tt.seconds < 0)) {
    throw new Error("Invalid target time");
  }
  const targetNames = targets.map((tt) => tt.targetName);
  if (new Set(targetNames).size !== targetNames.length) {
    throw new Error("Duplicate target names are not allowed");
  }
};

export const cleanTargets = (
  targets: MemberTargetTimes[] | undefined,
  nextTargetId: number,
  allTargetNames: string[]
) => {
  let targetId = nextTargetId;

  if (!targets) {
    return [] as MemberTargetTimes[];
  }

  const newTargets: MemberTargetTimes[] = targets.map((tt) => {
    const newTarget: MemberTargetTimes = { ...tt };
    newTarget.id = tt.id < 0 ? targetId++ : tt.id;

    const targetName = allTargetNames.find(
      (tn) =>
        tn.trim().toLocaleLowerCase() ===
        tt.targetName?.trim().toLocaleLowerCase()
    );

    const targetTime = correctHMS({
      hours: 0,
      minutes: tt.minutes,
      seconds: tt.seconds,
    });

    return {
      id: newTarget.id,
      minutes: targetTime.minutes,
      seconds: targetTime.seconds,
      targetName: targetName ?? tt.targetName?.trim(),
    } as MemberTargetTimes;
  });

  return newTargets;
};

export const getSfcMemberTargetTimes = () => {
  const targetTimes = SfcTargets.map((t, i) => ({
    targetName: t,
    id: i + 1 * -2,
    minutes: 0,
    seconds: 0,
  })) as MemberTargetTimes[];
  return targetTimes;
};

export const mapSvsTargets = (targets: MemberTargetTimes[]) => {
  const allTargets = getSfcMemberTargetTimes().map((t) => {
    const found = targets.find(
      (nt) =>
        nt.targetName?.toLocaleLowerCase()?.trim() ===
        t.targetName.toLocaleLowerCase().trim()
    );
    if (found) {
      t.minutes = found.minutes;
      t.seconds = found.seconds;
    }
    return t;
  });
  return allTargets;
};

export const getMemberMarchTime = (member: Member, targetName: string) => {
  const targetTime = member.targetTimes.find(
    (tt) =>
      tt.targetName.trim().toLocaleLowerCase() ===
      (targetName ?? targetName).trim().toLocaleLowerCase()
  );
  if (!targetTime) return undefined;

  return {
    memberName: member.name,
    order: member.order,
    minutes: targetTime.minutes,
    seconds: targetTime.seconds,
  };
};
