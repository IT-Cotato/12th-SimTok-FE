import { Emotion } from "./emotion.type";

export type Diary = {
  id: number;
  userId: number;
  userName: string;
  profile: string;
  emotion: Emotion;
  text: string;
  image?: string;
  createdAt: string;
};
