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
  const isSeed = plantGrowthStatus === "SEED";
  const isBloom = plantGrowthStatus === "BLOOM";

  const imageSrc = isBloom ? `/images/garden/${plantSort}.svg` : growthImage;

  const imageWidth = isSeed ? 135 : isBloom ? 150 : 170;

  return (
    <section className="relative flex h-[300px] w-full flex-col items-center justify-center">
      {/* 1. 배경이 되는 버블 */}
      <div className="relative z-30">
        <Bubble status={plantWaterStatus} />
      </div>

      {/* 2. 식물 이미지 영역 */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <Image
            src={imageSrc}
            width={imageWidth}
            height={172} // 높이는 비율에 맞춰 조정되거나 고정됨
            alt={`${plantSort} ${plantGrowthStatus}`}
            className="object-contain" // 이미지 비율 유지
          />
        </div>
      </div>
    </section>
  );
};
