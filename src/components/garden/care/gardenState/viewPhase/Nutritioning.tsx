import Image from "next/image";

import Lottie from "react-lottie-player";

import Bubble from "@/assets/garden/nutrition-bubble.svg";

import { PageTitle } from "@/components/common/PageTitle";

import { PLANT_IMAGE_MAP } from "@/constants/garden/plantList";

import { GrowthStage } from "@/types/plant.type";

import nutritionAnimate from "@/public/lotties/nutrition.json";

interface NutritioningProps {
  growthStage: GrowthStage;
}
export const Nutritioning = ({ growthStage }: NutritioningProps) => {
  const plantImg =
    PLANT_IMAGE_MAP[growthStage as keyof typeof PLANT_IMAGE_MAP].bad;
  return (
    <section className="z-99 flex flex-1 flex-col justify-between">
      <PageTitle
        title={["영양제로 힘을 회복하고있어요!"]}
        textColor="text-white"
      />
      <div className="relative -top-1/2 flex flex-1 translate-y-1/2 items-center justify-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Bubble className="h-auto w-auto object-cover" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex flex-col items-center">
            <Image
              src={plantImg}
              alt="식물이미지"
              width={152}
              height={160}
              className="relative top-[20px] z-20 h-auto max-w-[152px] object-contain"
            />
            <div className="relative z-30 -mt-[60px]">
              <Lottie
                play
                animationData={nutritionAnimate}
                loop
                style={{ width: 174, height: 175 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
