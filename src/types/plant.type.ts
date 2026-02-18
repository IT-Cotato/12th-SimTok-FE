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
export interface GardenStateItem {
  state: GardenState;
  growthStage: GrowthStage | null;
  title?: string[];
  action?: GardenAction[];
  background?: string;
}

export interface GardenPlantBase {
  sharedPlantId: number;
  growthValue: number;
  percentage: number;
  growthStage: GrowthStage;
  gardenState: GardenState;
  status: "GROWING" | "WITHERED" | "COMPLETED";
  isSoloMode: boolean;
  lastWateredBy: {
    memberId: number;
    isMe: boolean;
  };
  nutrientCount?: number; // 상세에는 있고 목록에는 없을 수 있음
}

/* 정원 목록의 개별 식물 아이템 (배열 요소) */
export interface GardenPlantItem extends GardenPlantBase {
  friendId: number;
  friendNickname: string;
  plantName: PlantSort;
  nickname: string; // 내 식물 별명
  lastWateredAt: string;
  createdAt: string;
}

/* 정원 목록 API 응답 전체 구조 */
export interface GardenListResponse {
  totalCount: number;
  nutrientCount: number;
  sharedPlants: GardenPlantItem[];
}

export interface PlantStatusInfo {
  gardenState: GardenState;
  isMe: boolean;
}
