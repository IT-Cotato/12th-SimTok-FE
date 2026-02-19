import Image from "next/image";

import Pot from "@/assets/garden/pot.svg";

import { PageTitle } from "@/components/common/PageTitle";

import { GARDEN_STATE_ITEM } from "@/constants/garden/gardenCare";
import { PLANT_IMAGE_MAP } from "@/constants/garden/plantList";

import { GrowthStage } from "@/types/plant.type";

interface WaterRecentlyProps {
  pageTitle?: string[];
  growthStage: GrowthStage;
}

export const WaterRecently = ({
  pageTitle,
  growthStage,
}: WaterRecentlyProps) => {
  const plantImg =
    PLANT_IMAGE_MAP[growthStage as keyof typeof PLANT_IMAGE_MAP].good;

  return (
    <section className="z-99 flex flex-1 flex-col justify-between">
      <PageTitle title={pageTitle} />
      <div className="relative z-99 flex items-center justify-center pt-[150px]">
        {/* 식물 이미지 */}
        <div className="relative flex items-center justify-center">
          <div className="absolute bottom-[153px] left-1/2 flex -translate-x-1/2 flex-col gap-[10px]">
            <Image
              src={plantImg}
              alt="식물이미지"
              width={132}
              height={185}
              className="h-auto object-contain"
            />
          </div>
          {/* 화분 */}
          <Pot className="h-[187px] w-[203px]" />
        </div>
      </div>
    </section>
  );
};
