import { PlantWaterStatus } from "@/constants/plantStatus";

export const getPlantStatus = (recentWateredTime: string) => {
  const wateredAt = new Date(recentWateredTime).getTime();

  const now = new Date();
  const diffHours = (now.getTime() - wateredAt) / (1000 * 60 * 60);

  if (diffHours < 24) return PlantWaterStatus.WATERED_RECENTLY;
  if (diffHours < 48) return PlantWaterStatus.WATERABLE;
  return PlantWaterStatus.WITHERED;
};
