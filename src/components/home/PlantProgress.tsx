"use client";

import { useRouter } from "next/navigation";

import "swiper/css";
import { Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ClockIcon from "@/assets/clock.svg";

import {
  PLANT_BG_BY_STATUS,
  PlantWaterStatus,
} from "@/constants/garden/plantStatus";

import { GardenListResponse } from "@/types/plant.type";

import { getGrowthImage } from "@/utils/getGrowthImage";
import { getPlantStatus, getPlantStatusMinutes } from "@/utils/getPlantStatus";

import { FullButton } from "../common/FullButton";
import { InfoMessage } from "../dailyRecord/InfoMessage";
import ProgressDots from "../onboarding/ProgressDots";
import { Bubble } from "./Bubble";
import { PlantWithBubble } from "./PlantWithBubble";

interface PlantProgressProps {
  plantProgressData: GardenListResponse;
}
export const PlantProgress = ({ plantProgressData }: PlantProgressProps) => {
  const plantLength = plantProgressData.totalCount;
  const plantList = plantProgressData.sharedPlants;
  const router = useRouter();

  return (
    <section className="h-full">
      <Swiper
        modules={[Keyboard]}
        keyboard={{ enabled: true }}
        loop={plantLength > 1}
        spaceBetween={16}
        slidesPerView={1}
      >
        {plantLength === 0 ? (
          <SwiperSlide>
            <div className="bg-plant-yellow relative h-[551px] w-full overflow-hidden">
              <div className="flex h-full flex-col items-center justify-center px-4">
                <Bubble status={PlantWaterStatus.EMPTY} />
                <div className="bg-blur pointer-events-none absolute bottom-0 z-10 h-[329px] w-full max-w-[440px]" />
                <div className="absolute bottom-[91px] z-20 flex w-full items-center justify-center px-4">
                  <InfoMessage
                    triangleUp={false}
                    text="원하는 식물을 골라보세요!"
                  />
                </div>

                <div className="absolute bottom-[13px] z-20 w-full px-4 py-[10px]">
                  <FullButton
                    isActive
                    onClick={() => router.push("/garden/new")}
                  >
                    식물 고르러 가기
                  </FullButton>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ) : (
          plantList.map((plant, index) => {
            const plantStatus = getPlantStatus(plant.lastWateredAt);

            const growthImage =
              plant.growthStage === "BLOOM"
                ? ""
                : getGrowthImage(plant.growthStage, plantStatus);

            const BG = PLANT_BG_BY_STATUS[plantStatus];

            const buttonTitle =
              plantStatus === PlantWaterStatus.EMPTY
                ? "식물 키우러가기"
                : "물주기";

            const routerLink =
              plantStatus === PlantWaterStatus.EMPTY
                ? "/garden/new"
                : "/garden/care";
            return (
              <SwiperSlide key={plant.sharedPlantId}>
                <div
                  className={`${BG} relative h-[551px] w-full overflow-hidden`}
                >
                  <div className="flex flex-col items-center">
                    <ProgressDots total={plantLength} current={index} />

                    {plantStatus === PlantWaterStatus.WATERED_RECENTLY ? (
                      <div className="text-h1 text-neutral-03">
                        {plant.lastWateredBy.isMe
                          ? "친구가 물을 줄 차례예요"
                          : "내가 물을 줄 차례에요"}
                      </div>
                    ) : plantStatus === PlantWaterStatus.WATERABLE ? (
                      <div className="flex items-center">
                        <ClockIcon className="text-blue-00 h-9 w-9" />
                        <h1 className="text-h1 text-blue-00">
                          {getPlantStatusMinutes(plant.lastWateredAt)}
                        </h1>
                      </div>
                    ) : plantStatus === PlantWaterStatus.WITHERED ? (
                      <div className="flex items-center">
                        <ClockIcon className="text-red-00 h-9 w-9" />
                        <h1 className="text-red-00 text-h1">
                          {getPlantStatusMinutes(plant.lastWateredAt)}
                        </h1>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="absolute bottom-[85px]">
                      <PlantWithBubble
                        plantWaterStatus={plantStatus}
                        plantGrowthStatus={plant.growthStage}
                        plantSort={plant.plantName}
                        growthImage={growthImage}
                      />
                    </div>

                    <div className="bg-blur pointer-events-none absolute bottom-0 z-10 h-[329px] w-full max-w-[440px]" />
                    <div className="absolute bottom-[73px] z-30 flex w-full items-center justify-center px-4 py-[10px]">
                      {plantLength > 0 ? (
                        <p className="text-h3 text-neutral-05 bg-glass-style z-99 rounded-2xl p-[10px]">
                          {plant.nickname}
                        </p>
                      ) : (
                        <InfoMessage text="원하는 식물을 골라보세요!" />
                      )}
                    </div>
                    <div className="absolute bottom-0 z-[100] w-full bg-white px-4 py-[10px]">
                      <FullButton
                        isActive={plant.lastWateredBy.isMe === true}
                        colorScheme={
                          (plantStatus === "WATERABLE" && "blue") ||
                          (plantStatus === "WITHERED" && "orange") ||
                          "mint"
                        }
                        onClick={() => {
                          router.push(routerLink);
                        }}
                      >
                        {buttonTitle}
                      </FullButton>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </section>
  );
};
