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
  plantSort: string;
  growthStatus: string;
  recentWateredTime: string; // ISO string
};
