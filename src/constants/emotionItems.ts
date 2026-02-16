export const HAPPY_EMOTION_MAP: Record<string, number> = {
  HAPPY_GLAD: 1,
  HAPPY_HAPPY: 2,
  HAPPY_JOY: 3,
  HAPPY_COOL: 4,
  HAPPY_PROUD: 5,
  HAPPY_GRATEFUL: 6,
  HAPPY_EXCITED: 7,
  HAPPY_SPECIAL: 8,
  HAPPY_LOVELY: 9,
  HAPPY_BEST: 10,
  HAPPY_SATISFIED: 11,
  HAPPY_GOOD: 12,
};
export const DAILY_EMOTION_MAP: Record<string, number> = {
  DAILY_PLAIN: 1,
  DAILY_SECRET: 2,
  DAILY_SILENT: 3,
  DAILY_SICK: 4,
  DAILY_SOSO: 5,
  DAILY_UNSURE: 6,
  DAILY_SHY: 7,
  DAILY_CONFUSED: 8,
  DAILY_TIRED: 9,
  DAILY_PLAYFUL: 10,
  DAILY_BORED: 11,
  DAILY_AMAZING: 12,
};

export const SAD_EMOTION_MAP: Record<string, number> = {
  SAD_SAD: 1,
  SAD_DEPRESSED: 2,
  SAD_WORRIED: 3,
  SAD_DISAPPOINTED: 4,
  SAD_ABSURD: 5,
  SAD_BAD: 6,
  SAD_HARD: 7,
  SAD_CRY: 8,
  SAD_SHOCKED: 9,
  SAD_EMBARRASSED: 10,
  SAD_SCARED: 11,
  SAD_UPSET: 12,
};

export const BAD_EMOTION_MAP: Record<string, number> = {
  ANGRY_ANGRY: 1,
  ANGRY_ANNOYED: 2,
  ANGRY_FRUSTRATED: 3,
  ANGRY_UNEASY: 4,
  ANGRY_SUSPICIOUS: 5,
  ANGRY_TERRIBLE: 6,
  ANGRY_AWKWARD: 7,
  ANGRY_FURIOUS: 8,
  ANGRY_RESENTFUL: 9,
  ANGRY_HATE: 10,
};

export const EMOTION_CODE_MAP = {
  happy: HAPPY_EMOTION_MAP,
  daily: DAILY_EMOTION_MAP,
  sad: SAD_EMOTION_MAP,
  bad: BAD_EMOTION_MAP,
} as const;

const createReverseMap = (map: Record<string, number>) => {
  return Object.fromEntries(
    Object.entries(map).map(([key, value]) => [value, key]),
  );
};

//SERVER_EMOTION_REVERSE_MAP.happy[3] → "HAPPY_JOY"
export const SERVER_EMOTION_REVERSE_MAP = {
  happy: createReverseMap(HAPPY_EMOTION_MAP),
  daily: createReverseMap(DAILY_EMOTION_MAP),
  sad: createReverseMap(SAD_EMOTION_MAP),
  bad: createReverseMap(BAD_EMOTION_MAP),
} as const;

export const EMOTION_ITEMS = {
  happy: {
    max: 12,
    items: {
      1: { presentText: "기뻐요", pastText: "기뻤어요" },
      2: { presentText: "행복해요", pastText: "행복했어요" },
      3: { presentText: "즐거워요", pastText: "즐거웠어요" },
      4: { presentText: "멋져요", pastText: "멋졌어요" },
      5: { presentText: "흐뭇해요", pastText: "흐뭇했어요" },
      6: { presentText: "감사해요", pastText: "감사했어요" },
      7: { presentText: "정말신나요", pastText: "정말 신났어요" },
      8: { presentText: "특별해요", pastText: "특별했어요" },
      9: { presentText: "사랑스러워요", pastText: "사랑스러웠어요" },
      10: { presentText: "최고예요", pastText: "최고였어요" },
      11: { presentText: "만족스러워요", pastText: "만족스러웠어요" },
      12: { presentText: "좋아요", pastText: "세상 행복했어요" },
    },
    getImageSrc: (index: number) => `/images/emoji/happy-${index}.svg`,
  },

  daily: {
    max: 12,
    items: {
      1: { presentText: "무난해요", pastText: "무난했어요" },
      2: { presentText: "비밀이에요", pastText: "비밀이었어요" },
      3: { presentText: "말하고싶지않아요", pastText: "말하고 싶지 않았어요" },
      4: { presentText: "아파요", pastText: "아팠어요" },
      5: { presentText: "그냥그래요", pastText: "그냥 그랬어요" },
      6: { presentText: "모르겠어요", pastText: "잘 모르겠었어요" },
      7: { presentText: "숨고싶어요", pastText: "숨고 싶었어요" },
      8: { presentText: "혼란스러워요", pastText: "혼란스러웠어요" },
      9: { presentText: "피곤해요", pastText: "피곤했어요" },
      10: { presentText: "장난치고싶어요", pastText: "장난치고 싶었어요" },
      11: { presentText: "심심해요", pastText: "심심했어요" },
      12: { presentText: "신기해요", pastText: "신기했어요" },
    },
    getImageSrc: (index: number) => `/images/emoji/daily-${index}.svg`,
  },

  sad: {
    max: 12,
    items: {
      1: { presentText: "슬퍼요", pastText: "슬펐어요" },
      2: { presentText: "우울해요", pastText: "우울했어요" },
      3: { presentText: "걱정이에요", pastText: "걱정됐어요" },
      4: { presentText: "실망스러워요", pastText: "실망스러웠어요" },
      5: { presentText: "황당해요", pastText: "황당했어요" },
      6: { presentText: "별로예요", pastText: "별로였어요" },
      7: { presentText: "힘들어요", pastText: "힘들었어요" },
      8: { presentText: "울고싶어요", pastText: "울고 싶었어요" },
      9: { presentText: "놀랐어요", pastText: "놀랐어요" },
      10: { presentText: "당황스러워요", pastText: "당황스러웠어요" },
      11: { presentText: "두려워요", pastText: "두려웠어요" },
      12: { presentText: "속상해요", pastText: "속상했어요" },
    },
    getImageSrc: (index: number) => `/images/emoji/sad-${index}.svg`,
  },

  bad: {
    max: 10,
    items: {
      1: { presentText: "화나요", pastText: "화났어요" },
      2: { presentText: "짜증나요", pastText: "짜증났어요" },
      3: { presentText: "답답해요", pastText: "답답했어요" },
      4: { presentText: "심란해요", pastText: "심란했어요" },
      5: { presentText: "의심스러워요", pastText: "의심스러웠어요" },
      6: { presentText: "끔찍해요", pastText: "끔찍했어요" },
      7: { presentText: "어수선해요", pastText: "어수선했어요" },
      8: { presentText: "분해요", pastText: "분했어요" },
      9: { presentText: "원망스러워요", pastText: "원망스러웠어요" },
      10: { presentText: "미워요", pastText: "미웠어요" },
    },
    getImageSrc: (index: number) => `/images/emoji/bad-${index}.svg`,
  },
} as const;

export const EMOTION_BUTTONS = [
  { key: "happy", label: "기쁨/행복/즐거움" },
  { key: "sad", label: "슬픔/우울/걱정" },
  { key: "bad", label: "화남/분노" },
  { key: "daily", label: "기타" },
];
