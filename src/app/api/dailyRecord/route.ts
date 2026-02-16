import { SharedDiaryFormState } from "@/types/sharedDiarySteps.type";

import { apiInstance } from "../apiInstance";

export const postSharedDiary = async (
  emojiCode: string,
  content?: string,
  imageUrl?: string,
) => {
  if (!content && !imageUrl) {
    throw new Error("content 또는 imageUrl 중 하나는 필요합니다.");
  }

  const body: SharedDiaryFormState = {
    date: new Date().toISOString().split("T")[0], //2026-02-16
    emojiCode,
    ...(content && { content }),
    ...(imageUrl && { imageUrl }),
  };

  const { data } = await apiInstance.post(`/diaries`, body);
  return data;
};
