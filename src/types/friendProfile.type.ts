// 친구목록 조회
export type FriendShipProfile = {
  friendshipId: number; // 친구관계 id
  friendId: number; // 친구의 userId
  showName: string;
  profileImageUrl: string;
  status: "ACTIVE" | "PENDING";
  lastInteractedAt: string;
};

// 정원에서의 친구목록 조회
export type Friend = {
  friendshipId: number; // 친구관계 id
  friendId: number; // 친구의 userId
  nickname: string;
  profileImageUrl: string;
};

export type CombinedFriend = FriendShipProfile | Friend;

export type FriendList = {
  count: number;
  friendshipList: FriendShipProfile[];
};

export type FriendGardenList = {
  count: number;
  friends: Friend[];
};

// 친구초대 요청 시 응답
export type PostFriendRequestResponse = {
  friendshipId: number;
  friendInfo: {
    id: number; // 상대방 userId
    name: string; // 상대방 이름
    profileImageUrl: string;
  };
  status: "PENDING" | "ACTIVE";
  createdAt: string;
};

// 초대코드로 친구 찾을 경우 응답
export type SearchFriendByInviteCodeResponse = {
  memberId: number;
  memberName: string;
  profileImageUrl: string;
};

export type ChatTopic =
  | "WEATHER"
  | "HEALTH"
  | "MEAL"
  | "MOOD"
  | "HOBBY"
  | "JOKE";

export type ChatStyle = "존댓말" | "반말";

// 친구 관계 조회
export type UpdateFriendshipPayload = {
  nickname?: string;
  speechStyle?: ChatStyle;
  chatGoal?: number;
  topicCodes?: ChatTopic[];
};

export interface FriendSetting extends UpdateFriendshipPayload {
  friendshipId: number;
}

export type ChatTopicItem = { key: ChatTopic; label: string; icon?: string };
