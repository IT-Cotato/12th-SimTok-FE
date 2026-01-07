import { Emotion } from "./emotion.type";

export type SharedDiaryFormState = {
  emotion?: Emotion;
  content?: string;
  file?: File;
};
