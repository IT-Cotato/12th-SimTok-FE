import { FriendList } from "@/types/friendProfile.type";

import { apiInstance } from "../apiInstance";

export const getFriendsList = async (status?: string): Promise<FriendList> => {
  const url = status ? `/friendships?status=${status}` : "/friendships";
  const { data } = await apiInstance.get(url);
  return data.data;
};
