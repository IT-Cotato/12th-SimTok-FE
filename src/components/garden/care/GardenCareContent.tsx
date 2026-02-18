import { JSX } from "react";
import { useMemo } from "react";

import { FullButton } from "@/components/common/FullButton";
import { ActionButton } from "@/components/garden/care/ActionButton";
import { ProgressSection } from "@/components/garden/care/ProgressSection";

import { GARDEN_STATE_ITEM } from "@/constants/garden/gardenCare";

import { GardenState, GrowthStage, PlantSort } from "@/types/plant.type";
import { GardenAction } from "@/types/plant.type";

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
  myTurn,
  onWater,
  onNutrition,
  onPlant,
}: {
  plantName?: string;
  percentage?: number;
  gardenState: GardenState;
  growthStage: GrowthStage;
  plantSort: PlantSort;
  myTurn: boolean;
  onWater: () => void;
  onNutrition: () => void;
  onPlant: () => void;
}) => {
  let Content: JSX.Element | null;

  const config = GARDEN_STATE_ITEM.find(
    item =>
      item.state === gardenState &&
      (item.growthStage === null || item.growthStage === growthStage),
  );

  const actualMyTurn = useMemo(() => {
    // A. 영양제 투여 후 상태: 영양제 준 사람이(isMe) 물까지 줘야 함
    if (gardenState === "AFTER_NUTRITION") {
      return myTurn === false; // (상위에서 !isMe를 줬으므로, isMe가 true일 때 true 반환)
      // 또는 명확하게 상위에서 isMe 자체를 props로 받는 것이 더 깨끗합니다.
    }

    // B. 씨앗 심기 직후 (성장도 0%): 누구나 물 줄 수 있음
    if (gardenState === "GROWING" && percentage === 0) {
      return true;
    }

    // C. 일반적인 상황: 번갈아가며 물주기
    return myTurn;
  }, [gardenState, percentage, myTurn]);

  // 2. 계산된 actualMyTurn을 버튼 리스트에 적용
  const activeButtonList = useMemo((): GardenAction[] => {
    if (!actualMyTurn) return [];
    return (config?.action as GardenAction[]) ?? [];
  }, [actualMyTurn, config]);
  const stageName = {
    SEED: "씨앗이",
    SPROUT: "새싹이",
    STEM: "줄기가",
    BUD: "꽃봉오리가",
    BLOOM: "꽃이",
  }[growthStage];

  const displayTitle = useMemo(() => {
    if (config?.title) return config.title;
    switch (gardenState) {
      case "WITHERED":
        return myTurn
          ? ["물이 부족해요!", `${stageName} 말라버렸어요`]
          : ["친구가 물을 줄 차례에요"];

      case "NUTRITION_AVAILABLE":
        return myTurn
          ? [`${stageName} 말라버렸어요!`, "영양제로 회복이 필요해요"]
          : ["친구가 물을 줄 차례예요"];

      case "WATERABLE":
        return myTurn ? ["내가 물을 줄 차례예요"] : ["친구가 물을 줄 차례에요"];

      case "WATERED_RECENTLY":
        return myTurn ? ["물을 줄 시간이에요!"] : ["친구가 물을 줄 차례에요"];
    }
  }, [gardenState, myTurn, stageName, config]);

  switch (gardenState) {
    case "SEED_READY":
      Content = <SeedReady onPlant={onPlant} />;
      break;
    case "GROWING":
      Content = <Growning growthStage={growthStage} />;
      break;
    case "WATERED_RECENTLY":
      Content = (
        <WaterRecently pageTitle={displayTitle} growthStage={growthStage} />
      );
      break;
    case "WATERABLE":
      Content = (
        <Waterable pageTitle={displayTitle} growthStage={growthStage} />
      );
      break;
    case "WITHERED":
      Content = <Withered pageTitle={displayTitle} growthStage={growthStage} />;
      break;
    case "NUTRITION_AVAILABLE":
      Content = (
        <NutritionAvailable
          pageTitle={displayTitle}
          growthStage={growthStage}
        />
      );
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
