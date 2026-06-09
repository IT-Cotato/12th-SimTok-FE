import { apiInstance } from "./apiInstance";

interface FriendSettingPayload {
  showName?: string;
  isFavorite?: boolean;
  isBlocked?: boolean;
}

export const friendsApi = {
  getFriendDetail: async (friendId: number) => {
    const { data } = await apiInstance.get(`/friendships?friendId=${friendId}`);
    return data;
  },

  saveFriendSetting: async (
    friendId: number,
    payload: FriendSettingPayload,
  ) => {
    const { data } = await apiInstance.post("/friendships", {
      friendId,
      ...payload,
    });
    return data;
  },
};
