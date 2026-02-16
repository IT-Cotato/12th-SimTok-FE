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
