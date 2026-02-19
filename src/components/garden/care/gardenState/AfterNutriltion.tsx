import Image from "next/image";

import ClockIcon from "@/assets/clock.svg";
import Pot from "@/assets/garden/pot.svg";

import { PageTitle } from "@/components/common/PageTitle";
import { InfoMessage } from "@/components/dailyRecord/InfoMessage";

import { GARDEN_STATE_ITEM } from "@/constants/garden/gardenCare";
import { PLANT_IMAGE_MAP } from "@/constants/garden/plantList";

import { GrowthStage } from "@/types/plant.type";

import { getPlantStatusMinutes } from "@/utils/getPlantStatus";

interface AfterNutritionProps {
  growthStage: GrowthStage;
  lastWateredTime: string;
}
export const AfterNutrition = ({
  growthStage,
  lastWateredTime,
}: AfterNutritionProps) => {
  const pageTitle = GARDEN_STATE_ITEM.find(
    item => item.state === "AFTER_NUTRITION",
  )?.title;

  const plantImg =
    PLANT_IMAGE_MAP[growthStage as keyof typeof PLANT_IMAGE_MAP].good;

  return (
    <section className="z-99 flex flex-1 flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex self-center">
          <ClockIcon className="text-mint-03 h-9 w-9" />
          <h1 className="text-mint-03 text-h1">
            {getPlantStatusMinutes(lastWateredTime)}
          </h1>
        </div>
        <PageTitle title={pageTitle} />
      </div>
      <div className="relative z-99 flex items-center justify-center">
        {/* 식물 이미지 */}
        <div className="relative flex items-center justify-center pt-[150px]">
          <div className="absolute bottom-[153px] left-1/2 flex -translate-x-1/2 flex-col gap-[10px]">
            <InfoMessage text="물이 필요해요!" triangleUp={false} />
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
