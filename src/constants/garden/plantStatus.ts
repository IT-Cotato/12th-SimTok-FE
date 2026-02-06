export const PlantWaterStatus = {
  EMPTY: "EMPTY", // 식물 없음
  WATERED_RECENTLY: "WATERED_RECENTLY", // 물 준 후 24시간 이내
  WATERABLE: "WATERABLE", // 물 준 후 24시간 이후 (다시 물 주기 가능)
  WITHERED: "WITHERED", // 48시간 경과 (시듦)
} as const;

export type PlantWaterStatusType =
  (typeof PlantWaterStatus)[keyof typeof PlantWaterStatus];

export const PLANT_BG_BY_STATUS = {
  [PlantWaterStatus.EMPTY]: "bg-plant-yellow",
  [PlantWaterStatus.WATERED_RECENTLY]: "bg-plant-green",
  [PlantWaterStatus.WATERABLE]: "bg-plant-blue",
  [PlantWaterStatus.WITHERED]: "bg-plant-red",
} as const;
