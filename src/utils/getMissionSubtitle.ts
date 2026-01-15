import { MISSION_STATUS } from "@/constants/missionCard";
import { WEEK_DAYS_KOR } from "@/constants/weekDays";

export const getMissionSubtitle = (
  status: keyof typeof MISSION_STATUS,
  todayIndex: number,
) => {
  const currentDay = WEEK_DAYS_KOR[todayIndex];
  const rawSubtitle = MISSION_STATUS[status].subtitle;
  const text =
    typeof rawSubtitle === "function"
      ? `${rawSubtitle(currentDay)}요일`
      : rawSubtitle;
  return text;
};
