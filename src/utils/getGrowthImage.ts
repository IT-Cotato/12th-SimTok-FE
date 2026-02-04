import { PLANT_IMAGE_MAP } from "@/constants/plantList";
import {
  PlantWaterStatus,
  PlantWaterStatusType,
} from "@/constants/plantStatus";

import { GrowthStatus } from "@/types/plant.type";

export const getGrowthImage = (
  growthStatus: GrowthStatus,
  plantStatus: PlantWaterStatusType,
) => {
  if (growthStatus === "FULL_GROWN") return "";

  const imageSet = PLANT_IMAGE_MAP[growthStatus];

  return plantStatus === PlantWaterStatus.WITHERED
    ? imageSet.bad
    : imageSet.good;
};
