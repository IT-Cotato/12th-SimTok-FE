import { Emotion } from "./emotion.type";

export type SharedDiaryFormState = {
  date: string;
  emojiCode: string;
  content?: string;
  imageUrl?: string;
};
