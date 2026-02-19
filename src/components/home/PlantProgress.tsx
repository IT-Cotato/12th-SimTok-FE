"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import "swiper/css";
import { Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { postWater } from "@/app/api/garden/care.api";

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
  const queryClient = useQueryClient();

  const { mutate: waterPlant } = useMutation({
    mutationFn: (plantId: number) => postWater(plantId),
    onMutate: async plantId => {
      await queryClient.cancelQueries({ queryKey: ["gardenList"] });
      const previousGardenData = queryClient.getQueryData<GardenListResponse>([
        "gardenList",
      ]);

      queryClient.setQueryData(
        ["gardenList"],
        (old: GardenListResponse | undefined) => {
          if (!old) return old;
          return {
            ...old,
            sharedPlants: old.sharedPlants.map(plant =>
              plant.sharedPlantId === plantId
                ? {
                    ...plant,
                    lastWateredBy: { ...plant.lastWateredBy, isMe: true },
                    lastWateredAt: new Date().toISOString(), // 즉시 상태 변경 유도
                  }
                : plant,
            ),
          };
        },
      );
      return { previousGardenData };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["gardenList"], context?.previousGardenData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["gardenList"] });
    },
  });

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

            // 텍스트 최적화: 내가 방금 물을 줬다면 안내 문구 변경
            const buttonTitle = plant.lastWateredBy.isMe
              ? "오늘 물주기 완료"
              : "물주기";

            return (
              <SwiperSlide key={plant.sharedPlantId}>
                <div
                  className={`${BG} relative h-[551px] w-full overflow-hidden transition-colors duration-500`}
                >
                  <div className="flex flex-col items-center">
                    <ProgressDots total={plantLength} current={index} />

                    {plantStatus === PlantWaterStatus.WATERED_RECENTLY ? (
                      <div className="text-h1 text-neutral-03">
                        {plant.lastWateredBy.isMe
                          ? "친구가 물을 줄 차례예요"
                          : "내가 물을 줄 차례에요"}
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <ClockIcon
                          className={`${plantStatus === "WITHERED" ? "text-red-00" : "text-blue-00"} h-9 w-9`}
                        />
                        <h1
                          className={`${plantStatus === "WITHERED" ? "text-red-00" : "text-blue-00"} text-h1`}
                        >
                          {getPlantStatusMinutes(plant.lastWateredAt)}
                        </h1>
                      </div>
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
                    <div className="absolute bottom-0 z-[50] w-full bg-white px-4 py-[10px]">
                      <FullButton
                        isActive={!plant.lastWateredBy.isMe}
                        colorScheme={
                          (plantStatus === "WATERABLE" && "blue") ||
                          (plantStatus === "WITHERED" && "orange") ||
                          "mint"
                        }
                        onClick={() => {
                          if (
                            plantStatus === "WATERABLE" ||
                            plantStatus === "WITHERED" ||
                            plantStatus === "WATERED_RECENTLY"
                          )
                            waterPlant(plant.sharedPlantId);
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
