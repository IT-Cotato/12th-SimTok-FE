export type GrowthStatus = "SEED" | "SPROUT" | "STEM" | "BUD" | "BLOOM";

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
};
