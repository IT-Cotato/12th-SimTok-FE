import Image from "next/image";

import { PlantWaterStatusType } from "@/constants/garden/plantStatus";

import { GrowthStage, PlantSort } from "@/types/plant.type";

import { Bubble } from "./Bubble";

interface PlantWithBubbleProps {
  plantWaterStatus: PlantWaterStatusType; // 물주기상태
  plantSort: PlantSort; // "daisy" | "tulip" | ...
  plantGrowthStatus: GrowthStage; // "SEED" | "SPROUT" | ...
  growthImage: string;
}

export const PlantWithBubble = ({
  plantWaterStatus,
  plantSort,
  plantGrowthStatus,
  growthImage,
}: PlantWithBubbleProps) => {
  return (
    <section className="relative flex h-[300px] w-full flex-col items-center justify-center">
      {/* 1. 배경이 되는 버블 */}
      <div className="relative z-30">
        <Bubble status={plantWaterStatus} />
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        {plantGrowthStatus === "BLOOM" ? (
          <div>
            <Image
              src={`/images/garden/${plantSort}.svg`}
              width={150}
              height={172}
              alt="식물이미지"
            />
          </div>
        ) : (
          <div>
            <Image
              src={growthImage}
              width={170}
              height={172}
              alt="식물이미지"
            />
          </div>
        )}
      </div>
    </section>
  );
};
