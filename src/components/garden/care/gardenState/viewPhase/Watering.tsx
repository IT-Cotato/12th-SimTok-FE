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
    // 1. justify-between 제거, items-center와 패딩으로 구조 잡기
    <section className="relative flex flex-1 flex-col items-center pt-8">
      {/* 2. 제목 영역: 상단에 고정 */}
      <div className="z-20">
        <PageTitle title={["물을 주고 있어요", "잠시만 기다려주세요"]} />
      </div>

      {/* 3. 식물 & 화분 컨테이너: flex-1을 주어 중앙 영역 차지 */}
      <div className="relative flex flex-1 items-center justify-center">
        {/* 화분 기준점 */}
        <div className="relative mt-20">
          {/* 식물 + Lottie 영역: 화분 위로 절대 위치 고정 */}
          <div className="absolute bottom-[145px] left-1/2 flex -translate-x-1/2 flex-col items-center">
            {/* 구름 애니메이션 */}
            <Lottie
              play
              animationData={wateringAnimation}
              loop
              style={{ width: 120, height: 120, marginBottom: "-20px" }}
            />

            {/* 식물 + 빛무리(Circle) */}
            <div className="relative flex h-[170px] w-[170px] items-center justify-center">
              <Circle className="absolute h-full w-full animate-pulse" />
              {plantImg && (
                <Image
                  src={plantImg}
                  alt="식물이미지"
                  width={111}
                  height={174}
                  className="relative z-10 h-auto object-contain"
                />
              )}
            </div>
          </div>

          {/* 화분 이미지 */}
          <Pot className="relative z-0 h-[187px] w-[203px]" />
        </div>
      </div>
    </section>
  );
};
