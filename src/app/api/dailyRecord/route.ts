import { SharedDiaryFormState } from "@/types/sharedDiarySteps.type";

import { apiInstance } from "../apiInstance";

export const postSharedDiary = async (
  date: string,
  emojiCode: string,
  content?: string,
  imageUrl?: string,
) => {
  if (!content && !imageUrl) {
    throw new Error("content 또는 imageUrl 중 하나는 필요합니다.");
  }

  const body: SharedDiaryFormState = {
    date,
    emojiCode,
    ...(content && { content }),
    ...(imageUrl && { imageUrl }),
  };

  const { data } = await apiInstance.post(`api/diaries`, body);
  return data;
};
