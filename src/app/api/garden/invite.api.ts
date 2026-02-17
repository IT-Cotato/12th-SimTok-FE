import { FriendGardenList } from "@/types/friendProfile.type";

import { apiInstance } from "../apiInstance";

export const getGardenInviteFriends = async (): Promise<FriendGardenList> => {
  const { data } = await apiInstance.get("/plant-invites/candidates");
  return data.data;
};
