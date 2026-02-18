import { NutritionAfterShortly } from "@/components/garden/care/gardenState/viewPhase/NutritionAfterShortly";
import { Nutritioning } from "@/components/garden/care/gardenState/viewPhase/Nutritioning";
import { Watering } from "@/components/garden/care/gardenState/viewPhase/Watering";

import { GrowthStage, ViewPhase } from "@/types/plant.type";

interface AnimationProps {
  phase: ViewPhase;
  stage: GrowthStage;
}

export const GardenAnimationView = ({ phase, stage }: AnimationProps) => {
  return (
    <div className="flex flex-1 flex-col">
      {phase === "WATERING" && <Watering growthStage={stage} />}
      {phase === "NUTRITION_BLACK" && <Nutritioning growthStage={stage} />}
      {phase === "NUTRITION_AFTER_SHORTLY" && (
        <NutritionAfterShortly growthStage={stage} />
      )}
    </div>
  );
};
