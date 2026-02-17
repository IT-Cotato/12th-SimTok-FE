import {
  CombinedFriend,
  Friend,
  FriendShipProfile,
} from "@/types/friendProfile.type";

export const getFriendName = (
  friend: CombinedFriend,
  gardenInviteMode: boolean,
) => {
  return gardenInviteMode
    ? (friend as Friend).nickname
    : (friend as FriendShipProfile).showName;
};
