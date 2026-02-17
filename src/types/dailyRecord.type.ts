export type MyDayLog = {
  isCompleted: boolean;
  challengeId: number; // 중첩되지 않고 평탄한 구조
  imageUrl: string;
  createdAt: string;
};

export type MyChallenge = {
  challengeId: number;
  imageUrl: string;
};

export type WeeklyStatus = {
  date: string; // "2026-02-16"
  status: "MISSED" | "WAITING" | "FUTURE" | "DONE";
};

export type MissionCategory = "FOOD" | "PLANT" | "COLOR" | "MOMENT" | "TV";

export type MissionInfo = {
  missionId: number;
  missionDate: string;
  category: MissionCategory;
  keyword: string;
  content: string;
};

export type MissionDashBoard = {
  todayDate: string;
  mission: MissionInfo;
  myChallenge: MyChallenge | null;
  weeklyStatus: WeeklyStatus[];
};

export type MissionDetail = {
  memberInfo?: {
    memberId: number;
    nickname: string;
  };
  challengeId: number;
  imageUrl: string;
  createdAt: string;
  isLiked?: boolean;
  likeCount?: number;
  commentCount?: number;
};

export type MissionFeedList = {
  memberInfo?: {
    memberId: number;
    nickname: string;
  };
  challengeId: number;
  imageUrl: string;
  createdAt: string;
  isViewed: boolean;
};
