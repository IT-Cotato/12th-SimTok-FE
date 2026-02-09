import { GardenState, ViewPhase } from "@/types/plant.type";

interface GardenBackgroundColorProps {
  gardenState: GardenState;
  viewPhase: ViewPhase;
}
export const GardenBackgroundColor = ({
  gardenState,
  viewPhase,
}: GardenBackgroundColorProps) => {
  const GARDEN_BG_BASE = "absolute inset-0 z-0 transition-colors duration-500";
  return <div></div>;
};
