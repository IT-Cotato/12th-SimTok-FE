"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import "swiper/css";
import { Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  getPlantList,
  postNutrient,
  postSeed,
  postWater,
} from "@/app/api/garden/care.api";

import { OnlyLoader } from "@/components/common/OnlyLoader";
import { ProgressDots } from "@/components/common/ProgressDot";
import { GardenAnimationView } from "@/components/garden/care/GardenAnimationView";
import { GardenBackgroundColor } from "@/components/garden/care/GardenBackgrounColor";
import { GardenCareContent } from "@/components/garden/care/GardenCareContent";
import { GardenCareHeader } from "@/components/garden/care/GardenCareHeader";
import { NoNutrition } from "@/components/garden/modal/NoNutrition";

import { useGardenStatus } from "@/hooks/useGardenStatus";

import { GardenPlantItem } from "@/types/plant.type";

const GardenCare = () => {
  const router = useRouter();
  const [selectTitle, setSelectTitle] = useState<"left" | "right">("right");
  const [plantList, setPlantList] = useState<GardenPlantItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noNutrientModal, setNoNutrientModal] = useState(false);
  const [nutrientCount, setNutrientCount] = useState(0);

  useEffect(() => {
    const fetchPlantList = async () => {
      try {
        const data = await getPlantList("GROWING");
        console.log(data);
        setNutrientCount(data.nutrientCount);
        setPlantList(data.sharedPlants ?? []);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlantList();
  }, []);

  const {
    currentIndex,
    setCurrentIndex,
    viewPhase,
    setViewPhase,
    optimisticState,
    plantStatuses,
    currentPlant,
    handleAction,
  } = useGardenStatus(plantList);

  const displayState =
    optimisticState ??
    (currentPlant
      ? plantStatuses[currentPlant.sharedPlantId]?.gardenState
      : "EMPTY") ??
    "EMPTY";

  const handleNutritionClick = async (plantId: number): Promise<void> => {
    if (nutrientCount <= 0) {
      setNoNutrientModal(true);
      return;
    }

    await handleAction(
      plantId,
      "AFTER_NUTRITION",
      [
        { phase: "NUTRITION_BLACK", duration: 1000 },
        { phase: "NUTRITION_AFTER_SHORTLY", duration: 1000 },
      ],
      async () => {
        await postNutrient(plantId);
      },
    );
    setNutrientCount(prev => Math.max(0, prev - 1));
  };

  const handlePlantClick = async (plantId: number): Promise<void> => {
    try {
      await handleAction(
        plantId,
        "GROWING", // 씨앗을 심은 후의 상태
        [], // 씨앗 심기는 별도 페이즈 애니메이션이 없다면 빈 배열
        async () => {
          await postSeed(plantId);
        },
      );
      console.log(
        `%c[Seed Success]: ${plantId}번 식물 심기 완료`,
        "color: #2ecc71; font-weight: bold",
      );
    } catch (error) {
      console.error("씨앗 심기 실패:", error);
    }
  };

  const handleWaterClick = async (plantId: number): Promise<void> => {
    await handleAction(
      plantId,
      "WATERED_RECENTLY",
      [{ phase: "WATERING", duration: 1000 }],
      async () => {
        await postWater(plantId);
      },
    );
  };

  // 초기 로딩 중 Loader 표시
  if (isLoading) return <OnlyLoader />;

  return (
    <main className="relative flex h-screen flex-col">
      <GardenBackgroundColor gardenState={displayState} viewPhase={viewPhase} />
      <GardenCareHeader
        selectTitle={selectTitle}
        onChangeSelectTitle={v => {
          setSelectTitle(v);
          if (v === "left") router.push("/garden");
        }}
      />

      {viewPhase !== "IDLE" ? (
        <GardenAnimationView
          phase={viewPhase}
          stage={currentPlant?.growthStage ?? "SEED"}
        />
      ) : (
        <div className="relative flex flex-1 flex-col">
          {plantList.length > 0 && (
            <div className="z-10 mt-4">
              <ProgressDots
                total={plantList.length}
                current={currentIndex + 1}
              />
            </div>
          )}

          {plantList.length > 0 && currentPlant ? (
            <Swiper
              initialSlide={currentIndex}
              onSlideChange={s => {
                setCurrentIndex(s.activeIndex);
                setViewPhase("IDLE");
              }}
              modules={[Keyboard]}
              keyboard={{ enabled: true }}
              className="h-full w-full flex-1"
            >
              {plantList.map(plant => (
                <SwiperSlide key={plant.sharedPlantId}>
                  <GardenCareContent
                    plant={plant}
                    localStatus={plantStatuses[plant.sharedPlantId]}
                    isOptimistic={
                      optimisticState !== null &&
                      plant.sharedPlantId === currentPlant.sharedPlantId
                    }
                    optimisticState={optimisticState}
                    onWater={() => handleWaterClick(plant.sharedPlantId)}
                    onNutrition={() =>
                      handleNutritionClick(plant.sharedPlantId)
                    }
                    onPlant={() => handlePlantClick(plant.sharedPlantId)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex flex-1 items-center justify-center text-white">
              키우고 있는 식물이 없어요.
            </div>
          )}
        </div>
      )}

      {noNutrientModal && (
        <NoNutrition onClose={() => setNoNutrientModal(false)} />
      )}
    </main>
  );
};

export default GardenCare;
