import { MyProfile } from "@/types/myProfile.type";

import { apiInstance } from "../apiInstance";

export const getMyProfile = async (): Promise<MyProfile> => {
  const { data } = await apiInstance.get("/profile");
  return data.data;
};
