export type FriendProfile = {
  userId: number;
  userName: string;
  nickNameByMe?: string; // 내가 설정한 닉네임
  profileImg?: string;
};

export type ChatTopic =
  | "weather"
  | "health"
  | "meal"
  | "mood"
  | "hobby"
  | "custom";

export type ChatTopicItem = { key: ChatTopic; label: string; icon?: string };

export type ChatStyle = "formal" | "casual";

export type FriendChatSetting = {
  friendProfile: FriendProfile;
  nickNameByFriend?: string; // 상대가 나를 부르는 이름
  goalDays?: number;
  chatStyle: ChatStyle;
  chatTopic: ChatTopic[];
  customTopic?: string;
};
