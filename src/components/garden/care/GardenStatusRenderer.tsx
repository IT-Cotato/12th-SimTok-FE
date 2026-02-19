import { GardenState, GrowthStage, PlantSort } from "@/types/plant.type";

// 실제 식물 상태별 컴포넌트들
import { AfterNutrition } from "./gardenState/AfterNutriltion";
import { Completed } from "./gardenState/Completed";
import { EmptyPlant } from "./gardenState/EmptyPlant";
import { Growning } from "./gardenState/Growning";
import { NutritionAvailable } from "./gardenState/NutritionAvailable";
import { SeedReady } from "./gardenState/SeedReady";
import { WaterRecently } from "./gardenState/WaterRecently";
import { Waterable } from "./gardenState/Waterable";
import { Withered } from "./gardenState/Withered";

interface RendererProps {
  state: GardenState;
  stage: GrowthStage;
  sort: PlantSort;
  lastWateredTime: string;
  title: string[];
  onPlant: () => void;
}

/**
 * GardenStatusRenderer
 * gardenState에 따라 각각 다른 식물 상태 UI를 반환합니다.
 */

export const GardenStatusRenderer = ({
  state,
  stage,
  sort,
  title,
  lastWateredTime,
  onPlant,
}: RendererProps) => {
  switch (state) {
    case "SEED_READY":
      return <SeedReady onPlant={onPlant} />;

    case "GROWING":
      return <Growning growthStage={stage} />;

    case "WATERED_RECENTLY":
      return <WaterRecently pageTitle={title} growthStage={stage} />;

    case "WATERABLE":
      return (
        <Waterable
          pageTitle={title}
          growthStage={stage}
          lastWateredTime={lastWateredTime}
        />
      );

    case "WITHERED":
      return (
        <Withered
          pageTitle={title}
          growthStage={stage}
          lastWateredTime={lastWateredTime}
        />
      );

    case "NUTRITION_AVAILABLE":
      return (
        <NutritionAvailable
          pageTitle={title}
          growthStage={stage}
          lastWateredTime={lastWateredTime}
        />
      );

    case "AFTER_NUTRITION":
      return (
        <AfterNutrition growthStage={stage} lastWateredTime={lastWateredTime} />
      );

    case "COMPLETED":
      return <Completed plantSort={sort} />;

    default:
      return null;
  }
};
