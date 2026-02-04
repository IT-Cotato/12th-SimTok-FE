export type GrowthStatus = "SEED" | "SPROUT" | "STEM" | "BUD" | "FULL_GROWN";

export type PlantSort =
  | "daisy"
  | "tulip"
  | "lily"
  | "sunflower"
  | "baby-breath";

export type GardenPlant = {
  id: number;
  nickname: string;
  plantSort: PlantSort;
  growthStatus: GrowthStatus;
  recentWateredTime: string; // ISO string
  withered: boolean; // 시듬여부
};
