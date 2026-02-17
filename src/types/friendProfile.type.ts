export type FriendProfile = {
  friendshipId: number; // 친구관계 id
  friendId: number; // 친구의 useerId
  showName: string;
  profileImageUrl: string;
  status: "ACTIVE" | "PENDING";
  lastInteractedAt: string;
};

export type FriendList = {
  count: number;
  friendshipList: FriendProfile[];
};

export type ChatTopic =
  | "weather"
  | "health"
  | "meal"
  | "mood"
  | "hobby"
  | "joke";

export type ChatStyle = "존댓말" | "반말";

export type FriendSetting = {
  friendshipId: number;
  nickname: string; // 내가 설정한 친구 닉네임
  speechStyle: ChatStyle;
  chatGoal: string;
  topicCodes: ChatTopic[];
};

export type ChatTopicItem = { key: ChatTopic; label: string; icon?: string };
