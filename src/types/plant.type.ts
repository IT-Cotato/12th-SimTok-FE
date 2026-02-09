export type GrowthStage = "SEED" | "SPROUT" | "STEM" | "BUD" | "BLOOM";

export type PlantSort =
  | "daisy"
  | "tulip"
  | "lily"
  | "sunflower"
  | "baby-breath";

export type GardenState =
  // 식물 없는 경우
  | "EMPTY"
  | "SEED_READY"
  // 성장 중
  | "GROWING"
  // 물 관련
  | "WATERED_RECENTLY"
  | "WATERABLE"
  // 시듦
  | "WITHERED" // 시듬 1일차
  | "NUTRITION_AVAILABLE" // 시듬 2일차
  | "AFTER_NUTRITION" // 영양제 주고 난 후 물이 필요한 상태
  // 완료
  | "COMPLETED";

export type GardenAction = "WATER" | "NUTRITION";

// 화면 인터렉션용 상태
export type ViewPhase =
  | "IDLE" // 기본 (gardenState 그대로 보여줌)
  | "NUTRITION_BLACK" // 영양제 투여중
  | "NUTRITION_AFTER_SHORTLY" // 영양제 투여 직후
  | "WATERING"; // 물주는 중

/* 정원 상태, 제목 매핑 */
export interface GardenTitleItem {
  state: GardenState;
  growthStage: GrowthStage | null;
  title: string[];
  action: GardenAction[];
  background?: string;
}

/* 정원 식물 정보 */
export type GardenPlant = {
  id: number;
  nickname: string;
  plantSort: PlantSort;
  growthStatus: GrowthStage;
  recentWateredTime: string;
  lastWateredById: number;
  gardenState: GardenState;
  percentage: number;
};
