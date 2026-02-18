import { useMemo, useState } from "react";

import { GardenPlantItem, GardenState, ViewPhase } from "@/types/plant.type";

export const useGardenStatus = (plantList: GardenPlantItem[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewPhase, setViewPhase] = useState<ViewPhase>("IDLE");
  const [optimisticState, setOptimisticState] = useState<GardenState | null>(
    null,
  );

  // 1. 수동으로 업데이트된 식물 상태만 기록하는 별도 상태
  const [manualUpdates, setManualUpdates] = useState<
    Record<number, { gardenState: GardenState; isMe: boolean }>
  >({});

  // 2. [핵심] 원본 데이터와 수동 업데이트 내역을 합쳐서 계산 (useEffect 필요 없음)
  const plantStatuses = useMemo(() => {
    const baseStatuses = plantList.reduce(
      (acc, plant) => {
        acc[plant.sharedPlantId] = {
          gardenState: plant.gardenState,
          isMe: plant.lastWateredBy?.isMe ?? false,
        };
        return acc;
      },
      {} as Record<number, { gardenState: GardenState; isMe: boolean }>,
    );

    // 원본 데이터 위에 수동 업데이트된 내역을 덮어씀
    return { ...baseStatuses, ...manualUpdates };
  }, [plantList, manualUpdates]);

  const currentPlant = plantList[currentIndex] || null;

  const handleAction = (
    plantId: number,
    nextState: GardenState,
    phases: { phase: ViewPhase; duration: number }[],
  ) => {
    setOptimisticState(nextState);

    if (phases.length > 0) {
      let totalDelay = 0;
      phases.forEach(p => {
        setTimeout(() => setViewPhase(p.phase), totalDelay);
        totalDelay += p.duration;
      });

      setTimeout(() => {
        // 3. 애니메이션 종료 후 manualUpdates에 기록하여 상태 유지
        setManualUpdates(prev => ({
          ...prev,
          [plantId]: {
            gardenState: nextState,
            isMe: true,
          },
        }));

        setViewPhase("IDLE");
        setOptimisticState(null);
      }, totalDelay);
    }
  };

  return {
    currentIndex,
    setCurrentIndex,
    viewPhase,
    setViewPhase,
    optimisticState,
    plantStatuses,
    currentPlant,
    handleAction,
  };
};
