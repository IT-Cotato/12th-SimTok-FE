import { DiaryListResponse } from "@/types/diary.type";
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
  const url = lastId
    ? `/diaries?lastId=${lastId}&size=${size}`
    : `/diaries?size=${size}`;

  const { data } = await apiInstance.get(url);
  console.log("공유 일기 목록 응답:", data.data);
  return data.data;
};
