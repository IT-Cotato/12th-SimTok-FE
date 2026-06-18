import { JwtPayload } from "jwt-decode";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface CustomJwtPayload extends JwtPayload {
  memberId?: string | number;
}

// 하루미션, 공유일기
export type WriterInfo = {
  memberId: number;
  nickname: string;
  profileImageUrl: string | null;
  isMe: boolean;
};

export type DailyComment = {
  commentId: number;
  writerInfo: WriterInfo;
  content: string;
  createdAt: string;
};

export type DailyCommentList = {
  comments: DailyComment[];
  lastId: number;
  hasNext: boolean;
};
