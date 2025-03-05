import type { Member, MemberTargetTimes } from "@/models";

export const parseTextMultipleTargets = (memberInfo: string, group: string) => {
  const memberInfoLines = memberInfo.split("\n").filter((l) => !!l.trim());

  // console.log("MemberInfoLines", memberInfoLines);
  if (memberInfoLines.length < 2)
    throw new Error("at least 2 lines are required to parse");

  let memberName = memberInfoLines.shift()!.trim();

  if (memberName[-1] === ":")
    memberName = memberName.substring(0, memberName.length - 1);

  //   console.log("memberName", memberName);
  //   console.log("MemberInfoLines", memberInfoLines);

  const targetTimes: MemberTargetTimes[] = memberInfoLines.flatMap((line) => {
    const parsedData: MemberTargetTimes[] = [];
    const match = line.matchAll(
      /(?<targetName>.*?):?\s(?<minutes>\d?\d)?:?(?<seconds>\d\d)/g
    );
    for (const m of match) {
      //   console.log("match", m, m.index);
      if (!m.groups) {
        throw new Error("Unable to parse member target data.");
        return [] as MemberTargetTimes[];
      }
      parsedData.push({
        id: -1,
        targetName: m.groups["targetName"],
        minutes: Number.parseInt(`${m.groups["minutes"] ?? "00"}`),
        seconds: Number.parseInt(`${m.groups["seconds"]}`),
      });
    }
    return parsedData;
  });

  const member: Member = {
    id: -1,
    order: -1,
    name: memberName,
    targetType: "Sunfire Castle",
    targetTimes: targetTimes,
    isSelected: true,
    group: group,
  };

  return member;
};

export const parseTextSingleTarget = (memberInfo: string, group: string) => {
  const memberInfoLines = memberInfo.split("\n").filter((l) => !!l.trim());

  console.log("MemberInfoLines", memberInfoLines);
  if (memberInfoLines.length < 1)
    throw new Error("at least 1 line is required to parse");

  const parsedMembers: Member[] = memberInfoLines.flatMap((line) => {
    const parsedData: Member[] = [];
    const match = line.matchAll(
      /(?<memberName>.*?):?\s(?<minutes>\d?\d)?:?(?<seconds>\d\d)/g
    );
    for (const m of match) {
      //   console.log("match", m, m.index);
      if (!m.groups) {
        throw new Error("Unable to parse member target data.");
      }
      const member:Member = {
        id: -1,
        order: -1,
        targetType: "Single Target",
        name: m.groups["memberName"],
        isSelected: true,
        group: group,
        targetTimes: [
          {
            id: -1,
            targetName: "Target",
            minutes: Number.parseInt(`${m.groups["minutes"] ?? "00"}`),
            seconds: Number.parseInt(`${m.groups["seconds"]}`),
          },
        ],
      };
      parsedData.push(member);
    }
    return parsedData;
  });

  return parsedMembers;
};
