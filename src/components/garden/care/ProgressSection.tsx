import clsx from "clsx";

import { PLANT_GROWTH_KOREAN } from "@/constants/garden/plantList";

import { GardenState, GrowthStage } from "@/types/plant.type";

interface ProgressSectionProps {
  plantName?: string;
  growthStage?: GrowthStage;
  gardenStatus?: GardenState;
  percentage?: number;
}

export const ProgressSection = ({
  plantName,
  growthStage,
  gardenStatus,
  percentage = 0,
}: ProgressSectionProps) => {
  console.log(gardenStatus);
  console.log(growthStage);

  const growthStageToKorean = PLANT_GROWTH_KOREAN.find(
    item => item.id === growthStage,
  )?.name;
  const progressBarColor = (() => {
    switch (gardenStatus) {
      case "NUTRITION_AVAILABLE":
        return "bg-neutral-01";
      case "WATERABLE":
        return "bg-blue-00";
      case "WITHERED":
        return "bg-orange-00";
      default:
        return "bg-gradient-orange";
    }
  })();
  return (
    <section className="flex w-full flex-col gap-[7px] rounded-2xl bg-white p-4 shadow-[0_0_14px_0_rgba(0,0,0,0.08)]">
      {plantName ? (
        <div className="text-h3 text-neutral-01 flex gap-[3px]">
          {growthStage === "BLOOM" ? <p>🌸</p> : <p>🌱</p>}
          <p>{plantName}</p>
          <p> {growthStageToKorean}</p>
          {growthStage === "BLOOM" ? <p>🌸</p> : <p>🌱</p>}
        </div>
      ) : (
        <div>🌱</div>
      )}

      <div className="flex w-full items-center gap-[49px]">
        {/* progress bar 영역 */}
        <div className="bg-neutral-08 h-2 flex-1 overflow-hidden rounded-sm">
          <div
            className={clsx(
              progressBarColor,
              "h-full rounded-sm transition-[width]",
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* percentage text */}
        <p className="text-sub1-sb text-neutral-03 whitespace-nowrap">
          {percentage}%
        </p>
      </div>
    </section>
  );
};
