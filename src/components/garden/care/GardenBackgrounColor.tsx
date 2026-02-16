import { GARDEN_STATE_ITEM } from "@/constants/garden/gardenCare";

import { GardenState, ViewPhase } from "@/types/plant.type";

interface GardenBackgroundColorProps {
  gardenState: GardenState;
  viewPhase: ViewPhase;
}
export const GardenBackgroundColor = ({
  gardenState,
  viewPhase,
}: GardenBackgroundColorProps) => {
  const currentBg = (() => {
    if (viewPhase === "WATERING") return "bg-watering";
    if (viewPhase === "NUTRITION_BLACK") return "bg-black";
    if (viewPhase === "NUTRITION_AFTER_SHORTLY")
      return "bg-shortly-after-nutrition";
    return (
      GARDEN_STATE_ITEM.find(item => item.state === gardenState)?.background ??
      "bg-white"
    );
  })();

  const GARDEN_BG_BASE = "absolute inset-0 z-0 transition-colors";
  return <div className={`${currentBg} ${GARDEN_BG_BASE}`}></div>;
};
