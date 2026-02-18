import { ChatStyle, ChatTopic, FriendList } from "@/types/friendProfile.type";

import { apiInstance } from "../apiInstance";

interface UpdateFriendshipPayload {
  nickname: string;
  speechStyle: "존댓말" | "반말";
  chatGoal: string; // "주 1일" 등
  topicCodes: ChatTopic[]; // ["DAILY_LIFE", "WEATHER"] 등
}

interface FriendSettingDetail {
  friendshipId: number;
  nickname: string;
  speechStyle: ChatStyle;
  chatGoal: string;
  topicCodes: ChatTopic[];
}

export const getFriendsList = async (status?: string): Promise<FriendList> => {
  const url = status ? `/friendships?status=${status}` : "/friendships";
  const { data } = await apiInstance.get(url);
  return data.data;
};

export const updateFriendship = async (
  friendshipId: number,
  payload: UpdateFriendshipPayload, // 명확한 타입 지정
) => {
  const { data } = await apiInstance.patch(
    `/friendships/${friendshipId}`,
    payload,
  );
  return data;
};

export const getFriendshipSettings = async (friendshipId: number) => {
  const { data } = await apiInstance.get(
    `/friendships/settings/${friendshipId}`,
  );
  return data;
};

export const deleteFriendship = async (friendshipId: number) => {
  const { data } = await apiInstance.delete(`/friendships/${friendshipId}`);
  return data;
};
