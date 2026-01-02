import { EMOTION_ITEMS } from "@/constants/emotionItems";

export const getEmotionMeta = (emotion: string) => {
  const [type, indexStr] = emotion.split("-");
  const index = Number(indexStr);

  const emotionGroup = EMOTION_ITEMS[type as keyof typeof EMOTION_ITEMS];
  if (!emotionGroup) return null;

  if (!Number.isInteger(index) || index < 1 || index > emotionGroup.max) {
    return null;
  }

  const item = emotionGroup.items[index as keyof typeof emotionGroup.items];

  return {
    imageSrc: emotionGroup.getImageSrc(index),
    pastText: item.pastText,
  };
};
