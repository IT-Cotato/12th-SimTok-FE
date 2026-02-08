export const GardenTitle = [
  // EMPTY
  {
    state: "EMPTY",
    growthStage: null,
    title: `아직 키우고 있는 식물이 없어요!<br/>정원에서 식물을 골라보세요`,
  },

  // SEED_READY
  {
    state: "SEED_READY",
    growthStage: "SEED",
    title: `친구와 함께 식물도 키우고<br/>정원도 꾸며볼까요?`,
  },

  //  GROWING
  {
    state: "GROWING",
    growthStage: "SEED",
    title: `화분에 씨앗을 심었어요.<br/>씨앗에 작은 변화가 생겼어요🙂`,
  },
  {
    state: "GROWING",
    growthStage: "SPROUT",
    title: `잘 키워주신 덕분에<br/>새싹으로 성장했어요☺️`,
  },
  {
    state: "GROWING",
    growthStage: "STEM",
    title: `정성껏 키워주셔서<br/>줄기가 튼튼해졌어요!👏`,
  },
  {
    state: "GROWING",
    growthStage: "BUD",
    title: `우와 이제 꽃봉오리가 피었어요!<br/>곧 꽃이 필거예요🥰`,
  },

  // WITHERED (1일차)
  {
    state: "WITHERED",
    growthStage: "SEED",
    title: `씨앗이 말라버렸어요!<br/>아래 물주기를 눌러주세요`,
  },
  {
    state: "WITHERED",
    growthStage: "SPROUT",
    title: `새싹이 말라버렸어요!<br/>아래 물주기를 눌러주세요`,
  },
  {
    state: "WITHERED",
    growthStage: "STEM",
    title: `줄기가 말라버렸어요!<br/>아래 물주기를 눌러주세요`,
  },
  {
    state: "WITHERED",
    growthStage: "BUD",
    title: `꽃봉오리가 말라버렸어요!<br/>아래 물주기를 눌러주세요`,
  },

  // NUTRITION_AVAILABLE (2일차)
  {
    state: "NUTRITION_AVAILABLE",
    growthStage: "SEED",
    title: `씨앗이 말라버렸어요!<br/>영양제로 회복시켜주세요`,
  },
  {
    state: "NUTRITION_AVAILABLE",
    growthStage: "SPROUT",
    title: `새싹이 말라버렸어요!<br/>영양제로 회복시켜주세요`,
  },
  {
    state: "NUTRITION_AVAILABLE",
    growthStage: "STEM",
    title: `줄기가 말라버렸어요!<br/>영양제로 회복시켜주세요`,
  },
  {
    state: "NUTRITION_AVAILABLE",
    growthStage: "BUD",
    title: `꽃봉오리가 말라버렸어요!<br/>영양제로 회복시켜주세요`,
  },

  // AFTER_NUTRITION
  {
    state: "AFTER_NUTRITION",
    growthStage: null,
    title: `회복 후, 물까지 주셔야해요!<br/>아래 물주기를 눌러주세요`,
  },

  // WATER
  {
    state: "WATERABLE",
    growthStage: null,
    title: `물을 줄 시간이에요!<br/>아래 물주기를 눌러보세요`,
  },
  {
    state: "WATERED_RECENTLY",
    growthStage: null,
    title: `오늘은 물 주기를 완료했어요🥳<br/>내일부터 물을 줄 수 있어요!`,
  },

  // COMPLETED
  {
    state: "COMPLETED",
    growthStage: "BLOOM",
    title: `축하해요! 잘 돌봐주신 덕분에<br/>꽃이 예쁘게 피었어요🤗`,
  },
] as const;
