import type { Member } from "@/models";

export const updateOrder = (member: Member[]): Member[] => {
  const updatedMembers: Member[] = [];
  let order = 0;
  member.forEach((m) => {
    updatedMembers.push({ ...m, order: (order += 10) });
  });
  return updatedMembers;
};

export const sortBySelected = (members: Member[]): Member[] => {
  const updated = [...members].sort((a, b) => {
    if (a.isSelected && !b.isSelected) return -1;
    if (!a.isSelected && b.isSelected) return 1;
    return 0;
  });
  return updated;
};
