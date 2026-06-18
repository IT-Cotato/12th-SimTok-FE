import {
  CombinedFriend,
  Friend,
  FriendShipProfile,
} from "@/types/friendProfile.type";

export const getFriendName = (
  friend: CombinedFriend,
  _gardenInviteMode?: boolean,
) => {
  return "showName" in friend ? friend.showName : friend.nickname;
};
