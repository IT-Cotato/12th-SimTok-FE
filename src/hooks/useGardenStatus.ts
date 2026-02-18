import { useState } from "react";

import { GardenPlantItem, GardenState, ViewPhase } from "@/types/plant.type";

import { runPhaseSequence } from "@/utils/runPhaseSequence";

export const useGardenStatus = (initialPlants: GardenPlantItem[] = []) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewPhase, setViewPhase] = useState<ViewPhase>("IDLE");
  const [optimisticState, setOptimisticState] = useState<GardenState | null>(
    null,
  );

  const [plantStatuses, setPlantStatuses] = useState<
    Record<number, { gardenState: GardenState; isMe: boolean }>
  >(() => {
    if (!initialPlants || initialPlants.length === 0) return {};

    return initialPlants.reduce(
      (acc, item) => {
        acc[item.sharedPlantId] = {
          gardenState: item.gardenState,
          isMe: item.lastWateredBy.isMe,
        };
        return acc;
      },
      {} as Record<number, { gardenState: GardenState; isMe: boolean }>,
    );
  });

  const currentPlant = initialPlants?.[currentIndex];

  const handleAction = async (
    plantId: number,
    nextState: GardenState,
    phases: { phase: ViewPhase; duration: number }[],
  ) => {
    setOptimisticState(nextState);
    try {
      if (phases.length > 0) {
        await runPhaseSequence(phases, setViewPhase);
      }
      setPlantStatuses(prev => ({
        ...prev,
        [plantId]: { gardenState: nextState, isMe: true },
      }));
    } catch (e) {
      console.error("Action Failed:", e);
    } finally {
      setOptimisticState(null);
      setViewPhase("IDLE");
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
