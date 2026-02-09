import { GardenTitle } from "@/constants/garden/gardenCare";

import { GardenState, ViewPhase } from "@/types/plant.type";

interface GardenBackgroundColorProps {
  gardenState: GardenState;
  viewPhase: ViewPhase;
}
export const GardenBackgroundColor = ({
  gardenState,
  viewPhase,
}: GardenBackgroundColorProps) => {
  const backgroundColor =
    GardenTitle.find(item => item.state === gardenState)?.background ??
    "bg-white";

  const GARDEN_BG_BASE = "absolute inset-0 z-0 transition-colors";
  return <div className={`${backgroundColor} ${GARDEN_BG_BASE}`}></div>;
};
