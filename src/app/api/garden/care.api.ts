import { GardenListResponse } from "@/types/plant.type";

import { apiInstance } from "../apiInstance";

export const getPlantList = async (
  status: "GROWING" | "COMPLETED",
): Promise<GardenListResponse> => {
  const { data } = await apiInstance.get(`shared-plants?status=${status}`);
  return data.data;
};
