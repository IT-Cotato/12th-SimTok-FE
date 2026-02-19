import { useMemo } from "react";

import { FullButton } from "@/components/common/FullButton";
import { ActionButton } from "@/components/garden/care/ActionButton";
import { ProgressSection } from "@/components/garden/care/ProgressSection";

import { GARDEN_STATE_ITEM } from "@/constants/garden/gardenCare";

import {
  GardenAction,
  GardenPlantItem,
  GardenState,
  GrowthStage,
} from "@/types/plant.type";

import { GardenStatusRenderer } from "./GardenStatusRenderer";

interface ContentProps {
  plant: GardenPlantItem;
  localStatus?: { gardenState: GardenState; isMe: boolean }; // 선택적 타입으로 변경
  isOptimistic: boolean;
  optimisticState: GardenState | null;
  onWater: () => void;
  onNutrition: () => void;
  onPlant: () => void;
}

export const GardenCareContent = ({
  plant,
  localStatus,
  isOptimistic,
  optimisticState,
  onWater,
  onNutrition,
  onPlant,
}: ContentProps) => {
  const effectiveState =
    isOptimistic && optimisticState
      ? optimisticState
      : (localStatus?.gardenState ?? "EMPTY");

  const { actualMyTurn, displayTitle } = useMemo(() => {
    if (!localStatus) return { actualMyTurn: false, displayTitle: [] };

    let myTurn = !localStatus.isMe;

    if (effectiveState === "AFTER_NUTRITION") myTurn = true;
    if (effectiveState === "GROWING" && plant.percentage === 0) myTurn = true;

    const stageNames: Record<GrowthStage, string> = {
      SEED: "씨앗이",
      SPROUT: "새싹이",
      STEM: "줄기가",
      BUD: "꽃봉오리가",
      BLOOM: "꽃이",
    };
    const stageName = stageNames[plant.growthStage];

    const titles: Partial<Record<GardenState, string[]>> = {
      WITHERED: myTurn
        ? ["물이 부족해요!", `${stageName} 말라버렸어요`]
        : ["친구가 물을 줄 차례예요"],
      NUTRITION_AVAILABLE: myTurn
        ? [`${stageName} 말라버렸어요!`, "영양제로 회복이 필요해요"]
        : ["친구가 물을 줄 차례예요"],
      WATERABLE: myTurn
        ? ["내가 물을 줄 차례예요"]
        : ["친구가 물을 줄 차례예요"],
      WATERED_RECENTLY: myTurn
        ? ["물을 줄 시간이에요!"]
        : ["친구가 물을 줄 차례예요"],
    };

    return { actualMyTurn: myTurn, displayTitle: titles[effectiveState] || [] };
  }, [effectiveState, localStatus, plant]);

  const activeButtons = useMemo((): GardenAction[] => {
    // 여기서도 localStatus 여부를 체크하는 actualMyTurn을 활용
    if (!actualMyTurn) return [];
    const config = GARDEN_STATE_ITEM.find(
      i =>
        i.state === effectiveState &&
        (i.growthStage === null || i.growthStage === plant.growthStage),
    );
    return (config?.action as GardenAction[]) ?? [];
  }, [actualMyTurn, effectiveState, plant.growthStage]);

  // 3. 훅 호출이 모두 끝난 지점에서 가드 로직(Early Return) 실행
  if (!localStatus) return null;

  // 4. 실제 렌더링
  return (
    <div className="flex h-full flex-col justify-between">
      <GardenStatusRenderer
        state={effectiveState}
        stage={plant.growthStage}
        sort={plant.plantName}
        lastWateredTime={plant.lastWateredAt}
        title={displayTitle}
        onPlant={onPlant}
      />
      <div className="z-[99] mt-[23px] flex flex-col gap-[10px]">
        <div className="px-4">
          <ProgressSection
            plantName={plant.nickname}
            percentage={plant.percentage}
            growthStage={plant.growthStage}
            gardenStatus={effectiveState}
          />
        </div>
        {effectiveState === "COMPLETED" ? (
          <div className="mb-[42px] px-4 py-[10px]">
            <FullButton>정원에 심으러가기</FullButton>
          </div>
        ) : (
          <ActionButton
            activeButton={activeButtons}
            onNutrition={onNutrition}
            onWater={onWater}
          />
        )}
      </div>
    </div>
  );
};
