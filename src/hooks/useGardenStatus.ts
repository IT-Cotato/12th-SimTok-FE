import { useMemo, useState } from "react";

import { GardenPlantItem, GardenState, ViewPhase } from "@/types/plant.type";

export const useGardenStatus = (plantList: GardenPlantItem[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewPhase, setViewPhase] = useState<ViewPhase>("IDLE");
  const [optimisticState, setOptimisticState] = useState<GardenState | null>(
    null,
  );

  // 수동 업데이트 내역 (성공 시에만 기록)
  const [manualUpdates, setManualUpdates] = useState<
    Record<number, { gardenState: GardenState; isMe: boolean }>
  >({});

  // 원본 데이터 + 성공한 수동 업데이트 합치기
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
    return { ...baseStatuses, ...manualUpdates };
  }, [plantList, manualUpdates]);

  const currentPlant = plantList[currentIndex] || null;

  const handleAction = async (
    plantId: number,
    nextState: GardenState,
    phases: { phase: ViewPhase; duration: number }[],
    apiCall?: () => Promise<void>,
  ): Promise<void> => {
    if (viewPhase !== "IDLE") return;

    // 1. 낙관적 업데이트 시작 (애니메이션 피드백)
    setOptimisticState(nextState);

    try {
      // 2. API 호출과 애니메이션 병렬 실행
      const apiPromise = apiCall ? apiCall() : Promise.resolve();

      if (phases.length > 0) {
        let totalDelay = 0;
        phases.forEach(p => {
          setTimeout(() => setViewPhase(p.phase), totalDelay);
          totalDelay += p.duration;
        });
        await new Promise(resolve => setTimeout(resolve, totalDelay));
      }

      // 3. API 결과 확정 대기
      await apiPromise;
      console.log(
        `%c[Garden Action Success]: ${nextState} 반영 완료`,
        "color: #2ecc71; font-weight: bold",
      );
      // 4. [성공 시에만] 상태를 영구적으로 업데이트
      setManualUpdates(prev => ({
        ...prev,
        [plantId]: { gardenState: nextState, isMe: true },
      }));
    } catch (error) {
      // 5. [실패 시] 별도의 수동 업데이트를 하지 않음
      // -> finally에서 optimisticState가 null이 되며 이전 상태로 롤백됨
      console.error("Action failed:", error);
    } finally {
      setViewPhase("IDLE");
      setOptimisticState(null);
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
