import { SERVER_EMOTION_REVERSE_MAP } from "./emotionItems";

export const convertToServerEmotion = (value: string) => {
  const [category, indexStr] = value.split("-");
  const index = Number(indexStr);

  return SERVER_EMOTION_REVERSE_MAP[
    category as keyof typeof SERVER_EMOTION_REVERSE_MAP
  ][index];
};
