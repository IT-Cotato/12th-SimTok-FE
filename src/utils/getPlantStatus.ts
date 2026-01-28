import { PlantWaterStatus } from "@/constants/plantStatus";

const HOUR = 60 * 60 * 1000;
const MINUTE = 60 * 1000;

export const getPlantStatus = (recentWateredTime: string) => {
  if (!recentWateredTime) return PlantWaterStatus.EMPTY;
  const wateredAt = new Date(recentWateredTime).getTime();
  if (Number.isNaN(wateredAt)) return PlantWaterStatus.EMPTY;

  const now = new Date();
  const diffHours = (now.getTime() - wateredAt) / HOUR;

  if (diffHours < 24) return PlantWaterStatus.WATERED_RECENTLY;
  if (diffHours < 48) return PlantWaterStatus.WATERABLE;
  return PlantWaterStatus.WITHERED;
};

export const getDiffMinutes = (from: number, to: number = Date.now()) => {
  return Math.floor((to - from) / MINUTE);
};

const formatMinutesToHourMinute = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} : ${minutes.toString().padStart(2, "0")}`;
};

export const getPlantStatusMinutes = (
  recentWateredTime?: string,
): string | null => {
  if (!recentWateredTime) return null;
  const wateredAt = new Date(recentWateredTime).getTime();
  if (Number.isNaN(wateredAt)) return PlantWaterStatus.EMPTY;

  const now = Date.now();
  const diffMs = now - wateredAt;

  // WATERABLE → 48시간까지 남은 시간 (카운트다운)
  if (diffMs >= 24 * HOUR && diffMs < 48 * HOUR) {
    const remainingMinutes = Math.ceil((48 * HOUR - diffMs) / MINUTE);
    return formatMinutesToHourMinute(remainingMinutes);
  }

  // WITHERED → 48시간 초과 후 경과 시간 (카운트업)
  if (diffMs >= 48 * HOUR) {
    const passedMinutes = Math.floor((diffMs - 48 * HOUR) / MINUTE);
    return formatMinutesToHourMinute(passedMinutes);
  }

  return null;
};
