import { WriterInfo } from "./common";
import { Emotion } from "./emotion.type";

// 다이어리 상세 정보 (API 응답과 1:1 매칭)
export type DiaryDetail = {
  writerInfo: WriterInfo;
  diaryId: number;
  date: string;
  emojiCode: string;
  emojiDescription?: string;
  content: string;
  imageUrl: string | null;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt?: string;
};

export type DiaryListResponse = {
  diaries: DiaryDetail[];
  lastId: number;
  hasNext: boolean;
};
