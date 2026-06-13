import axios from "axios";

import { apiInstance } from "./apiInstance";

interface FriendSettingPayload {
  showName?: string;
  isFavorite?: boolean;
  isBlocked?: boolean;
}

export const friendsApi = {
  getFriendDetail: async (friendId: number) => {
    try {
      const { data } = await apiInstance.get("/friendships", {
        params: { friendId },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      throw error;
    }
  },

  saveFriendSetting: async (
    friendId: number,
    payload: FriendSettingPayload,
  ) => {
    try {
      const { data } = await apiInstance.post("/friendships", {
        friendId,
        ...payload,
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      throw error;
    }
  },
};
