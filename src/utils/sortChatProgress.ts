import { ChatProgress } from "@/types/chatProgress.type";

export const sortChatProgress = (data: ChatProgress[]) => {
  return [...data].sort((a, b) => {
    if (a.hasTodayChat !== b.hasTodayChat) {
      return Number(a.hasTodayChat) - Number(b.hasTodayChat);
    }

    const aRate = a.goalDays === 0 ? 0 : a.totalDays / a.goalDays;
    const bRate = b.goalDays === 0 ? 0 : b.totalDays / b.goalDays;

    return aRate - bRate;
  });
};
