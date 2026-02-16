import { EMOTION_CODE_MAP, EMOTION_ITEMS } from "@/constants/emotionItems";

export const getEmotionMeta = (emotion: string) => {
  if (!emotion) return null;

  let category: string;
  let index: number;

  // 1. "happy-8" 형식으로 들어왔을 경우
  if (emotion.includes("-")) {
    const [type, indexStr] = emotion.split("-");
    category = type;
    index = Number(indexStr);
  }
  // 2. "HAPPY_SPECIAL" 형식으로 들어왔을 경우 (서버 코드)
  else {
    category = emotion.split("_")[0].toLowerCase();

    if (category === "angry") category = "bad";

    const map = EMOTION_CODE_MAP[category as keyof typeof EMOTION_CODE_MAP];
    if (!map) return null;
    index = map[emotion as keyof typeof map];
  }

  const emotionGroup = EMOTION_ITEMS[category as keyof typeof EMOTION_ITEMS];
  if (!emotionGroup || !index) return null;

  const item = emotionGroup.items[index as keyof typeof emotionGroup.items];
  if (!item) return null;

  return {
    imageSrc: emotionGroup.getImageSrc(index),
    pastText: item.pastText,
    presentText: item.presentText,
  };
};
