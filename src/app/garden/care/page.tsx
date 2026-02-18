"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import "swiper/css";
import { Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { getPlantList } from "@/app/api/garden/care.api";

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
        setNutrientCount(data.nutrientCount);
        setPlantList(data.sharedPlants ?? []);
        console.log("식물목록", data.sharedPlants);
      } catch (error) {
        console.error("식물 목록 로드 실패:", error);
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

  // 로딩 중이거나 데이터가 없을 때의 배경색 처리
  const displayState =
    optimisticState ??
    (currentPlant
      ? plantStatuses[currentPlant.sharedPlantId]?.gardenState
      : "EMPTY") ??
    "EMPTY";

  const handleNav = (value: "left" | "right") => {
    setSelectTitle(value);
    if (value === "left") router.push("/garden");
  };

  const handleNutritionClick = (plantId: number) => {
    // 2. 영양제 수량 체크 로직
    if (nutrientCount <= 0) {
      setNoNutrientModal(true); // 수량이 없으면 모달 오픈
      return;
    }

    // 수량이 있으면 기존 애니메이션 및 액션 실행
    handleAction(plantId, "AFTER_NUTRITION", [
      { phase: "NUTRITION_BLACK", duration: 1000 },
      { phase: "NUTRITION_AFTER_SHORTLY", duration: 1000 },
    ]);
  };

  if (isLoading) return <div className="bg-brown h-screen" />;

  return (
    <main className="relative flex h-screen flex-col">
      <GardenBackgroundColor gardenState={displayState} viewPhase={viewPhase} />
      <GardenCareHeader
        selectTitle={selectTitle}
        onChangeSelectTitle={handleNav}
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
                    onWater={() =>
                      handleAction(plant.sharedPlantId, "WATERED_RECENTLY", [
                        { phase: "WATERING", duration: 1000 },
                      ])
                    }
                    onNutrition={() =>
                      handleNutritionClick(plant.sharedPlantId)
                    }
                    onPlant={() =>
                      handleAction(plant.sharedPlantId, "GROWING", [])
                    }
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
