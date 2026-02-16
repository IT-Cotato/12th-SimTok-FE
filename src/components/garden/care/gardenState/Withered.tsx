import Image from "next/image";

import Pot from "@/assets/garden/pot.svg";

import { PageTitle } from "@/components/common/PageTitle";
import { InfoMessage } from "@/components/dailyRecord/InfoMessage";

import { GARDEN_STATE_ITEM } from "@/constants/garden/gardenCare";
import { PLANT_IMAGE_MAP } from "@/constants/garden/plantList";

import { GrowthStage } from "@/types/plant.type";

interface WitheredProps {
  growthStage: GrowthStage;
}

export const Withered = ({ growthStage }: WitheredProps) => {
  const pageTitle = GARDEN_STATE_ITEM.find(
    item => item.state === "WITHERED" && item.growthStage === growthStage,
  )?.title;

  const plantImg =
    PLANT_IMAGE_MAP[growthStage as keyof typeof PLANT_IMAGE_MAP].bad;

  const isBud = growthStage === "BUD";
  const isSeed = growthStage === "SEED";

  return (
    <section className="z-99 flex flex-1 flex-col justify-between">
      <PageTitle title={pageTitle} />
      <div className="relative z-99 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          {/* 식물 이미지 영역 */}
          <div
            className={`absolute ${isSeed ? "bottom-[143px]" : "bottom-[153px]"} left-1/2 flex -translate-x-1/2 flex-col items-center justify-center`}
          >
            <div className="relative flex flex-col items-center gap-[10px]">
              {/* 말풍선 배치 로직 */}
              <div
                className={
                  isBud
                    ? "absolute top-[50px] -right-[92px] z-50 whitespace-nowrap" // BUD일 때: 우상단 이동
                    : "relative"
                }
              >
                <div className="w-max whitespace-nowrap">
                  <InfoMessage text="물이 필요해요!" triangleUp={false} />
                </div>
              </div>

              {/* 식물 이미지 */}
              <Image
                src={plantImg}
                alt="식물이미지"
                width={isSeed ? "90" : "132"}
                height={185}
                className="h-auto object-contain"
              />
            </div>
          </div>

          {/* 화분 */}
          <Pot className="h-[187px] w-[203px]" />
        </div>
      </div>
    </section>
  );
};
