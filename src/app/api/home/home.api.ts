import { GardenListResponse } from "@/types/plant.type";

import { apiInstance } from "../apiInstance";

export const getPlantWidget = async (): Promise<GardenListResponse> => {
  const { data } = await apiInstance.get("/shared-plants/widget");
  return data.data;
};
