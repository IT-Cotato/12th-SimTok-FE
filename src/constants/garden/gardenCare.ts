import { GardenStateItem } from "@/types/plant.type";

export const GARDEN_STATE_ITEM: readonly GardenStateItem[] = [
  // EMPTY
  {
    state: "EMPTY",
    growthStage: null,
    title: ["아직 키우고 있는 식물이 없어요!", "정원에서 식물을 골라보세요"],
    action: [],
  },

  // SEED_READY
  {
    state: "SEED_READY",
    growthStage: "SEED",
    title: ["친구와 함께 식물도 키우고", "정원도 꾸며볼까요?"],
    action: [],
  },

  // GROWING
  {
    state: "GROWING",
    growthStage: "SEED",
    title: ["화분에 씨앗을 심었어요.", "씨앗에 작은 변화가 생겼어요🙂"],
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
    title: ["우와 이제 꽃봉오리가 피었어요!", "곧 꽃이 필거예요🥰"],
    action: ["WATER"],
    background: "bg-radial-yellowgreen-mintgreen",
  },

  // WITHERED (1일차)
  {
    state: "WITHERED",
    growthStage: "SEED",
    title: ["씨앗이 말라버렸어요!", "아래 물주기를 눌러주세요"],
    action: ["WATER"],
    background: "bg-withered",
  },
  {
    state: "WITHERED",
    growthStage: "SPROUT",
    title: ["새싹이 말라버렸어요!", "아래 물주기를 눌러주세요"],
    action: ["WATER"],
    background: "bg-withered",
  },
  {
    state: "WITHERED",
    growthStage: "STEM",
    title: ["줄기가 말라버렸어요!", "아래 물주기를 눌러주세요"],
    action: ["WATER"],
    background: "bg-withered",
  },
  {
    state: "WITHERED",
    growthStage: "BUD",
    title: ["꽃봉오리가 말라버렸어요!", "아래 물주기를 눌러주세요"],
    action: ["WATER"],
    background: "bg-withered",
  },

  // NUTRITION_AVAILABLE (2일차)
  {
    state: "NUTRITION_AVAILABLE",
    growthStage: "SEED",
    title: ["씨앗이 말라버렸어요!", "영양제로 회복시켜주세요"],
    action: ["NUTRITION"],
    background: "bg-nutrition-available",
  },
  {
    state: "NUTRITION_AVAILABLE",
    growthStage: "SPROUT",
    title: ["새싹이 말라버렸어요!", "영양제로 회복시켜주세요"],
    action: ["NUTRITION"],
    background: "bg-nutrition-available",
  },
  {
    state: "NUTRITION_AVAILABLE",
    growthStage: "STEM",
    title: ["줄기가 말라버렸어요!", "영양제로 회복시켜주세요"],
    action: ["NUTRITION"],
    background: "bg-nutrition-available",
  },
  {
    state: "NUTRITION_AVAILABLE",
    growthStage: "BUD",
    title: ["꽃봉오리가 말라버렸어요!", "영양제로 회복시켜주세요"],
    action: ["NUTRITION"],
    background: "bg-nutrition-available",
  },

  // AFTER_NUTRITION
  {
    state: "AFTER_NUTRITION",
    growthStage: null,
    title: ["회복 후, 물까지 주셔야해요!", "아래 물주기를 눌러주세요"],
    action: ["WATER"],
    background: "bg-watering",
  },

  // WATER
  {
    state: "WATERABLE",
    growthStage: null,
    title: ["물을 줄 시간이에요!", "아래 물주기를 눌러보세요"],
    action: ["WATER"],
    background: "bg-watering",
  },
  {
    state: "WATERED_RECENTLY",
    growthStage: null,
    title: ["오늘은 물 주기를 완료했어요🥳"],
    action: ["WATER"],
    background: "bg-after-watering",
  },

  // COMPLETED
  {
    state: "COMPLETED",
    growthStage: "BLOOM",
    title: ["축하해요! 잘 돌봐주신 덕분에", "꽃이 예쁘게 피었어요🤗"],
    action: [],
    background: "bg-radial-yellowgreen-mintgreen",
  },
] as const;
