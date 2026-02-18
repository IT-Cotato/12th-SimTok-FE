import { GardenListResponse } from "@/types/plant.type";

import { apiInstance } from "../apiInstance";

export const getPlantList = async (
  status: "GROWING" | "COMPLETED",
): Promise<GardenListResponse> => {
  const { data } = await apiInstance.get(`shared-plants?status=${status}`);
  return data.data;
};

// 물주기
export const postWater = async (sharedPlantId: number) => {
  const { data } = await apiInstance.get(
    `shared-plants/${sharedPlantId}/water`,
  );
  return data.data;
};

// 영양제 주기
export const postNutrient = async (sharedPlantId: number) => {
  const { data } = await apiInstance.get(
    `shared-plants/${sharedPlantId}/nutrient`,
  );
  return data.data;
};

// 씨앗 심기
export const postSeed = async (sharedPlantId: number) => {
  const { data } = await apiInstance.get(
    `shared-plants/${sharedPlantId}/plant`,
  );
  return data.data;
};
