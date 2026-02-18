import { useEffect, useMemo, useState } from "react";

import { GardenPlantItem, GardenState, ViewPhase } from "@/types/plant.type";

export const useGardenStatus = (plantList: GardenPlantItem[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewPhase, setViewPhase] = useState<ViewPhase>("IDLE");
  const [optimisticState, setOptimisticState] = useState<GardenState | null>(
    null,
  );

  // plantList가 바뀔 때마다 ID별 상태 객체를 생성
  const plantStatuses = useMemo(() => {
    return plantList.reduce(
      (acc, plant) => {
        acc[plant.sharedPlantId] = {
          gardenState: plant.gardenState,
          // 서버 데이터 구조: lastWateredBy 내부에 isMe가 있음
          isMe: plant.lastWateredBy?.isMe ?? false,
        };
        return acc;
      },
      {} as Record<number, { gardenState: GardenState; isMe: boolean }>,
    );
  }, [plantList]);

  const currentPlant = plantList[currentIndex] || null;

  const handleAction = (
    plantId: number,
    nextState: GardenState,
    phases: { phase: ViewPhase; duration: number }[],
  ) => {
    setOptimisticState(nextState);

    // 애니메이션 단계별 실행 로직 (예시)
    if (phases.length > 0) {
      let totalDelay = 0;
      phases.forEach(p => {
        setTimeout(() => setViewPhase(p.phase), totalDelay);
        totalDelay += p.duration;
      });
      setTimeout(() => {
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
