"use client";

import "swiper/css";
import { Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { PLANT_BG_BY_STATUS, PlantWaterStatus } from "@/constants/plantStatus";

import plantProgressData from "@/mock/plantProgress.json";

import { getPlantStatus } from "@/utils/getPlantStatus";

import { FullButton } from "../common/FullButton";
import { InfoMessage } from "../dailyRecord/InfoMessage";
import ProgressDots from "../onboarding/ProgressDots";
import { Bubble } from "./Bubble";

export const PlantProgress = () => {
  const plantLength = plantProgressData.length;

  return (
    <section className="h-full">
      <Swiper
        modules={[Keyboard]}
        keyboard={{ enabled: true }}
        loop={true}
        spaceBetween={16}
        slidesPerView={1}
      >
        {plantLength === 0 ? (
          <SwiperSlide>
            <div className="bg-plant-yellow relative h-[551px] w-full overflow-hidden">
              <div className="flex h-full flex-col items-center justify-center px-4">
                <Bubble status={"EMPTY"} />
                <div className="bg-blur absolute bottom-0 z-10 h-[329px] w-full max-w-[440px]" />
                <div className="absolute bottom-[91px] z-20 flex w-full items-center justify-center px-4">
                  <InfoMessage
                    triangleUp={false}
                    text="원하는 식물을 골라보세요!"
                  />
                </div>

                <div className="absolute bottom-[13px] z-20 w-full px-4 py-[10px]">
                  <FullButton isActive>식물 고르러 가기</FullButton>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ) : (
          plantProgressData.map((plant, index) => {
            const plantStatus = getPlantStatus(plant.recentWateredTime);

            const BG = PLANT_BG_BY_STATUS[plantStatus];

            const buttonTitle =
              plantStatus === PlantWaterStatus.EMPTY
                ? "식물 키우러가기"
                : "물주기";

            return (
              <SwiperSlide key={plant.plantId}>
                <div
                  className={`${BG} relative h-[551px] w-full overflow-hidden`}
                >
                  <div className="flex flex-col items-center">
                    <ProgressDots total={plantLength} current={index} />
                    <h1 className="text-h1">
                      {plantStatus === "WATERED_RECENTLY"
                        ? "오늘은 물주기를 완료했어요🥳"
                        : ""}
                    </h1>

                    <Bubble status={plantStatus} />
                    <div className="bg-blur absolute bottom-0 z-10 h-[329px] w-full max-w-[440px]" />
                    <div className="absolute bottom-[84px] z-30 flex w-full items-center justify-center px-4 py-[10px]">
                      {plantLength > 1 ? (
                        <p className="text-h3 text-neutral-05 bg-glass-style z-99 rounded-2xl p-[10px]">
                          {plant.plantName}
                        </p>
                      ) : (
                        <InfoMessage text="원하는 식물을 골라보세요!" />
                      )}
                    </div>
                    <div className="absolute bottom-[13px] z-99 w-full px-4 py-[10px]">
                      <FullButton
                        isActive={!(plantStatus === "WATERED_RECENTLY")}
                        colorScheme={
                          (plantStatus === "WATERABLE" && "blue") ||
                          (plantStatus === "WITHERED" && "orange") ||
                          "mint"
                        }
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
