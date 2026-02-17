import { Emotion } from "./emotion.type";

export type WriterInfo = {
  memberId: number;
  nickname: string;
  profileImageUrl: string | null;
  isMe: boolean;
};
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

export type DiaryComment = {
  commentId: number;
  writerInfo: WriterInfo;
  content: string;
  createdAt: string;
};

export type DiaryCommentList = {
  comments: DiaryComment[];
  lastId: number;
  hasNext: boolean;
};
