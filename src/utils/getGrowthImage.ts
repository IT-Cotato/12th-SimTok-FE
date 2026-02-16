import { PLANT_IMAGE_MAP } from "@/constants/garden/plantList";
import {
  PlantWaterStatus,
  PlantWaterStatusType,
} from "@/constants/garden/plantStatus";

import { GrowthStage } from "@/types/plant.type";

export const getGrowthImage = (
  growthStatus: GrowthStage,
  plantStatus: PlantWaterStatusType,
) => {
  if (growthStatus === "BLOOM") return "";

  const imageSet = PLANT_IMAGE_MAP[growthStatus];

  return plantStatus === PlantWaterStatus.WITHERED
    ? imageSet.bad
    : imageSet.good;
};
