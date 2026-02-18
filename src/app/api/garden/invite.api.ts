import { FriendGardenList } from "@/types/friendProfile.type";
import { PlantSort } from "@/types/plant.type";
import { InviteResponse, PlantInvite } from "@/types/plantInvite.type";

import { apiInstance } from "../apiInstance";

// 초대가능한 친구목록
export const getGardenInviteFriends = async (): Promise<FriendGardenList> => {
  const { data } = await apiInstance.get("/plant-invites/candidates");
  return data.data;
};

// 식물 초대
export const postPlantInvite = async (
  inviteeId: number,
  plantName: PlantSort,
  nickname: string,
  message: string,
) => {
  const { data } = await apiInstance.post("/plant-invites", {
    inviteeId,
    plantName,
    nickname,
    message,
  });
  return data.data;
};

// 초대받은 식물 수락 및 거절
export const patchInvite = async (
  plantInviteId: number,
  status: InviteResponse,
) => {
  const { data } = await apiInstance.patch(`/plant-invites/${plantInviteId}`, {
    status,
  });
  return data.data;
};

// 초대받은 식물 목록 조회
export const getInvitationList = async (): Promise<PlantInvite> => {
  const { data } = await apiInstance.get("/plant-invites/my");
  return data.data;
};
