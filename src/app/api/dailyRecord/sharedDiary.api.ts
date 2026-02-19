import { DiaryDetail } from "@/types/diary.type";
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

  return data;
};

export const getSharedDiaryList = async (size: number, lastId?: number) => {
  const url = lastId
    ? `/diaries?lastId=${lastId}&size=${size}`
    : `/diaries?size=${size}`;

  const { data } = await apiInstance.get(url);

  return data.data;
};

export const postLike = async (diaryId: number) => {
  const { data } = await apiInstance.post(`/diaries/${diaryId}/likes`);
  if (!data.success || data.code !== "SUCCESS") {
    // 서버가 보내준 message를 에러 객체에 담아 던짐
    const error = new Error(data.message || "알 수 없는 에러가 발생했습니다.");
    throw error;
  }
  return data.data;
};

export const deleteLike = async (diaryId: number) => {
  const { data } = await apiInstance.delete(`/diaries/${diaryId}/likes`);
  if (!data.success || data.code !== "SUCCESS") {
    const error = new Error(data.message || "알 수 없는 에러가 발생했습니다.");
    throw error;
  }
  return data.data;
};

export const getDiaryDetail = async (diaryId: number): Promise<DiaryDetail> => {
  const { data } = await apiInstance.get(`/diaries/${diaryId}`);
  if (!data.success || data.code !== "SUCCESS") {
    const error = new Error(data.message || "알 수 없는 에러가 발생했습니다.");
    throw error;
  }
  return data.data;
};

export const getDiaryComments = async (
  diaryId: number,
  size: number,
  lastId?: number | null,
) => {
  const url =
    lastId !== undefined && lastId !== null
      ? `/diaries/${diaryId}/comments?lastId=${lastId}&size=${size}`
      : `/diaries/${diaryId}/comments?size=${size}`;

  const { data } = await apiInstance.get(url);
  return data.data;
};

export const postDiaryComment = async (diaryId: number, content: string) => {
  const { data } = await apiInstance.post(`/diaries/${diaryId}/comments`, {
    content,
  });
  return data.data;
};
