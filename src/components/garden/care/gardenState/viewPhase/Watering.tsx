import Image from "next/image";

import Lottie from "react-lottie-player";

import Pot from "@/assets/garden/pot.svg";
import Circle from "@/assets/garden/waterCircle.svg";

import { PageTitle } from "@/components/common/PageTitle";

import { PLANT_IMAGE_MAP } from "@/constants/garden/plantList";

import { GrowthStage } from "@/types/plant.type";

import wateringAnimation from "@/public/lotties/rainy.json";

interface WateringProps {
  growthStage: GrowthStage;
}
export const Watering = ({ growthStage }: WateringProps) => {
  const plantImg =
    PLANT_IMAGE_MAP[growthStage as keyof typeof PLANT_IMAGE_MAP].good;

  return (
    <section className="z-99 flex flex-1 flex-col justify-between">
      <PageTitle title={["물을 주고 있어요", "잠시만 기다려주세요"]} />
      <div className="relative z-99 flex items-center justify-center">
        {/* 식물 이미지 */}
        <div className="relative flex items-center justify-center">
          <div className="absolute bottom-[153px] left-1/2 flex w-max -translate-x-1/2 flex-col items-center">
            <Lottie
              play
              animationData={wateringAnimation}
              loop
              style={{ width: 125, height: 125 }}
            />
            <div className="relative flex h-[176px] w-full items-center justify-center">
              <Circle className="absolute h-[176px] w-[176px]" />
              {plantImg && (
                <Image
                  src={plantImg}
                  alt="식물이미지"
                  width={132}
                  height={185}
                  className="object-obtain h-auto"
                />
              )}
            </div>
          </div>
          {/* 화분 */}
          <Pot className="h-[187px] w-[203px]" />
        </div>
      </div>
    </section>
  );
};
