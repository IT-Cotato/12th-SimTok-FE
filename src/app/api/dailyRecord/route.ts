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

  const { data } = await apiInstance.post(`/diaries`, body);
  console.log("업로드 응답:", data);
  return data;
};

export const getSharedDiaryList = async (size: number, lastId?: number) => {
  if (!lastId) {
    const { data } = await apiInstance.get(`api/diaries?size=${size}`);
  } else {
    const { data } = await apiInstance.get(
      `api/diaries?lastId=${lastId}&size=${size}`,
    );
  }
};
