import { Emotion } from "./emotion.type";

export type SharedDiaryFormState = {
  emotion?: Emotion;
  text?: string;
  file?: File;
};
