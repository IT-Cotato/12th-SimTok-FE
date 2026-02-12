import { JSX } from "react";

import { FullButton } from "@/components/common/FullButton";
import { ActionButton } from "@/components/garden/care/ActionButton";
import { ProgressSection } from "@/components/garden/care/ProgressSection";

import { GARDEN_STATE_ITEM } from "@/constants/garden/gardenCare";

import { GardenState, GrowthStage, PlantSort } from "@/types/plant.type";

import { AfterNutrition } from "./gardenState/AfterNutriltion";
import { Completed } from "./gardenState/Completed";
import { Growning } from "./gardenState/Growning";
import { NutritionAvailable } from "./gardenState/NutritionAvailable";
import { SeedReady } from "./gardenState/SeedReady";
import { WaterRecently } from "./gardenState/WaterRecently";
import { Waterable } from "./gardenState/Waterable";
import { Withered } from "./gardenState/Withered";

export const GardenCareContent = ({
  plantName,
  percentage,
  gardenState,
  growthStage,
  plantSort,
  onWater,
  onNutrition,
}: {
  plantName?: string;
  percentage?: number;
  gardenState: GardenState;
  growthStage: GrowthStage;
  plantSort: PlantSort;
  onWater: () => void;
  onNutrition: () => void;
}) => {
  let Content: JSX.Element | null;
  const activeButtonList =
    GARDEN_STATE_ITEM.find(item => item.state === gardenState)?.action ?? [];

  switch (gardenState) {
    case "SEED_READY":
      Content = <SeedReady />;
      break;
    case "GROWING":
      Content = <Growning growthStage={growthStage} />;
      break;
    case "WATERED_RECENTLY":
      Content = <WaterRecently growthStage={growthStage} />;
      break;
    case "WATERABLE":
      Content = <Waterable growthStage={growthStage} />;
      break;
    case "WITHERED":
      Content = <Withered growthStage={growthStage} />;
      break;
    case "NUTRITION_AVAILABLE":
      Content = <NutritionAvailable growthStage={growthStage} />;
      break;
    case "AFTER_NUTRITION":
      Content = <AfterNutrition growthStage={growthStage} />;
      break;
    case "COMPLETED":
      Content = <Completed plantSort={plantSort} />;
      break;
    default:
      Content = null;
  }

  return (
    <div className="flex flex-1 flex-col justify-between">
      {Content}

      {/* 공통 UI */}
      <div className="z-99 mt-[23px] flex flex-col gap-[10px]">
        <div className="px-4">
          <ProgressSection
            plantName={plantName}
            percentage={percentage}
            growthStage={growthStage}
            gardenStatus={gardenState}
          />
        </div>
        {gardenState === "COMPLETED" ? (
          <div className="mb-[42px] px-4 py-[10px]">
            <FullButton>정원에 심으러가기</FullButton>
          </div>
        ) : (
          // TODO: WATER_RECENTLY 상태에서 마지막 물준 사람이 나인 경우에 액션 버튼 제거
          <ActionButton
            activeButton={activeButtonList}
            onNutrition={onNutrition}
            onWater={onWater}
          />
        )}
      </div>
    </div>
  );
};
