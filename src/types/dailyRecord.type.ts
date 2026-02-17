export interface UserActivity {
  userId: number;
  userName: string;
  topic: "sky" | "meal" | "cloth";
  image: string;
  isRead: boolean;
  createdAt: string;
}

//
export type MyChallenge = {
  challengeId: number;
  imageUrl: string;
  createdAt: string;
};

export type MyDayLog = {
  isCompleted: boolean;
  myChallenge: MyChallenge | null;
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
