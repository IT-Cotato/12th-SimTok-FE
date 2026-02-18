import { PLANT_IMAGE_MAP } from "@/constants/garden/plantList";
import { PLANT_SORT_INFO } from "@/constants/garden/plantList";
import {
  PlantWaterStatus,
  PlantWaterStatusType,
} from "@/constants/garden/plantStatus";

import { GrowthStage, PlantSort } from "@/types/plant.type";

export const getGrowthImage = (
  growthStatus: GrowthStage,
  plantStatus: PlantWaterStatusType,
  plantName?: PlantSort,
) => {
  if (growthStatus === "BLOOM") {
    const plantInfo = PLANT_SORT_INFO.find(item => item.id === plantName);
    return plantInfo ? plantInfo.img : "";
  }

  const imageSet = PLANT_IMAGE_MAP[growthStatus];
  if (!imageSet) return "";

  return plantStatus === PlantWaterStatus.WITHERED
    ? imageSet.bad
    : imageSet.good;
};
