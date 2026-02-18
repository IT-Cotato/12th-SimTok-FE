import { GardenStateItem } from "@/types/plant.type";

export const GARDEN_STATE_ITEM: readonly GardenStateItem[] = [
  {
    state: "EMPTY",
    growthStage: null,
    title: ["키우고 있는 식물이 없어요", "정원에서 식물을 골라보세요"],
    action: [],
  },
  {
    state: "SEED_READY",
    growthStage: "SEED",
    title: ["씨앗을 심고 시작해볼까요?"],
    action: [],
  },
  {
    state: "GROWING",
    growthStage: "SEED",
    title: ["씨앗을 심었어요", "이제 화분에 물을 주세요!"],
    action: ["WATER"],
    background: "bg-radial-yellowgreen-mintgreen",
  },
  {
    state: "GROWING",
    growthStage: "SPROUT",
    title: ["잘 키워주신 덕분에", "새싹으로 성장했어요☺️"],
    action: ["WATER"],
    background: "bg-radial-yellowgreen-mintgreen",
  },
  {
    state: "GROWING",
    growthStage: "STEM",
    title: ["정성껏 키워주셔서", "줄기가 튼튼해졌어요!👏"],
    action: ["WATER"],
    background: "bg-radial-yellowgreen-mintgreen",
  },
  {
    state: "GROWING",
    growthStage: "BUD",
    title: ["꽃봉오리가 피었어요!🥰", "이제 곧 꽃이 필 거예요!"],
    action: ["WATER"],
    background: "bg-radial-yellowgreen-mintgreen",
  },

  {
    state: "WITHERED",
    growthStage: "SEED",
    background: "bg-withered",
    action: ["WATER"],
  },
  {
    state: "WITHERED",
    growthStage: "SPROUT",
    background: "bg-withered",
    action: ["WATER"],
  },
  {
    state: "WITHERED",
    growthStage: "STEM",
    background: "bg-withered",
    action: ["WATER"],
  },
  {
    state: "WITHERED",
    growthStage: "BUD",
    background: "bg-withered",
    action: ["WATER"],
  },

  {
    state: "NUTRITION_AVAILABLE",
    growthStage: "SEED",
    background: "bg-nutrition-available",
    action: ["NUTRITION"],
  },
  {
    state: "NUTRITION_AVAILABLE",
    growthStage: "SPROUT",
    background: "bg-nutrition-available",
    action: ["NUTRITION"],
  },
  {
    state: "NUTRITION_AVAILABLE",
    growthStage: "STEM",
    background: "bg-nutrition-available",
    action: ["NUTRITION"],
  },
  {
    state: "NUTRITION_AVAILABLE",
    growthStage: "BUD",
    background: "bg-nutrition-available",
    action: ["NUTRITION"],
  },

  {
    state: "AFTER_NUTRITION",
    growthStage: null,
    title: ["아직 물이 더 필요해요", "목마른 식물에게 물을 주세요!"],
    action: ["WATER"],
    background: "bg-watering",
  },
  {
    state: "WATERABLE",
    growthStage: null,
    background: "bg-watering",
    action: ["WATER"],
  },
  {
    state: "WATERED_RECENTLY",
    growthStage: null,
    background: "bg-after-watering",
    action: ["WATER"],
  },
  {
    state: "COMPLETED",
    growthStage: "BLOOM",
    title: ["축하해요! 잘 돌봐주신 덕분에", "꽃이 예쁘게 피었어요🤗"],
    action: [],
    background: "bg-radial-yellowgreen-mintgreen",
  },
] as const;
