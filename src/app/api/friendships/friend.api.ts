import {
  FriendList,
  PostFriendRequestResponse,
  SearchFriendByInviteCodeResponse,
  UpdateFriendshipPayload,
} from "@/types/friendProfile.type";

import { apiInstance } from "../apiInstance";

export const getFriendsList = async (status?: string): Promise<FriendList> => {
  const url = status ? `/friendships?status=${status}` : "/friendships";
  const { data } = await apiInstance.get(url);
  return data.data;
};

export const updateFriendship = async (
  friendshipId: number,
  payload: UpdateFriendshipPayload,
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

export const postFriendRequest = async (
  friendshipId: number,
): Promise<PostFriendRequestResponse> => {
  const { data } = await apiInstance.post(`/friendships/${friendshipId}`);
  return data.data;
};

export const searchFriendByInviteCode = async (
  inviteCode: string,
): Promise<SearchFriendByInviteCodeResponse> => {
  const { data } = await apiInstance.get(
    `/friendships/search?inviteCode=${encodeURIComponent(inviteCode)}`,
  );
  return data.data;
};
