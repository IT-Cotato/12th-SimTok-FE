interface FriendSettingPayload {
  showName?: string;
  isFavorite?: boolean;
  isBlocked?: boolean;
}

export const friendsApi = {
  getFriendDetail: async (friendId: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`/api/friendships?friendId=${friendId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  saveFriendSetting: async (
    friendId: number,
    payload: FriendSettingPayload,
  ) => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`/api/friendships`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendId, ...payload }),
    });
    return res.json();
  },
};
