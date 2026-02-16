"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import "swiper/css";
import { Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ProgressDots } from "@/components/common/ProgressDot";
import { ActionButton } from "@/components/garden/care/ActionButton";
import { GardenBackgroundColor } from "@/components/garden/care/GardenBackgrounColor";
import { GardenCareContent } from "@/components/garden/care/GardenCareContent";
import { GardenCareHeader } from "@/components/garden/care/GardenCareHeader";
import { ProgressSection } from "@/components/garden/care/ProgressSection";
import { EmptyPlant } from "@/components/garden/care/gardenState/EmptyPlant";
import { NutritionAfterShortly } from "@/components/garden/care/gardenState/viewPhase/NutritionAfterShortly";
import { Nutritioning } from "@/components/garden/care/gardenState/viewPhase/Nutritioning";
import { Watering } from "@/components/garden/care/gardenState/viewPhase/Watering";

import PlantData from "@/mock/plantProgress.json";

import {
  GardenState,
  GrowthStage,
  PlantSort,
  ViewPhase,
} from "@/types/plant.type";

import { runPhaseSequence } from "@/utils/runPhaseSequence";

const GardenCare = () => {
  const router = useRouter();
  const [selectTitle, setSelectTitle] = useState<"left" | "right">("right");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewPhase, setViewPhase] = useState<ViewPhase>("IDLE");

  // 각 식물(id)별 최신 gardenState를 저장
  const [plantGardenStates, setPlantGardenStates] = useState<
    Record<number, GardenState>
  >(
    PlantData.reduce(
      (acc, item) => {
        acc[item.id] = item.gardenState as GardenState;
        return acc;
      },
      {} as Record<number, GardenState>,
    ),
  );

  const [optimisticGardenState, setOptimisticGardenState] =
    useState<GardenState | null>(null);

  const currentStep = PlantData?.[currentIndex];
  const currentPlantId = currentStep?.id;

  // 현재 슬라이드의 실제 gardenState 계산
  const currentGardenState: GardenState = currentPlantId
    ? (optimisticGardenState ?? plantGardenStates[currentPlantId] ?? "EMPTY")
    : "EMPTY";

  const displayGardenState = currentGardenState;

  const handleChangeSelectTitle = (value: "left" | "right") => {
    setSelectTitle(value);

    if (value === "left") {
      router.push("/garden");
    }
  };

  const handleNutrition = async () => {
    if (!currentPlantId) return;

    setOptimisticGardenState("AFTER_NUTRITION");

    try {
      await runPhaseSequence(
        [
          { phase: "NUTRITION_BLACK", duration: 1000 },
          { phase: "NUTRITION_AFTER_SHORTLY", duration: 1000 },
        ],
        setViewPhase,
      );

      const newState: GardenState = "AFTER_NUTRITION";

      setPlantGardenStates(prev => ({
        ...prev,
        [currentPlantId]: newState,
      }));
    } catch (e) {
      console.error("영양제 실패:", e);
    } finally {
      setOptimisticGardenState(null);
      setViewPhase("IDLE");
    }
  };

  const handleWater = async () => {
    if (!currentPlantId) return;

    setOptimisticGardenState("WATERED_RECENTLY");

    try {
      await runPhaseSequence(
        [{ phase: "WATERING", duration: 1000 }],
        setViewPhase,
      );

      // TODO: 실제 API 호출
      // const res = await waterPlantApi();
      // const newState = res.gardenState;

      const newState: GardenState = "WATERED_RECENTLY";

      setPlantGardenStates(prev => ({
        ...prev,
        [currentPlantId]: newState,
      }));
    } catch (e) {
      console.error("물주기 실패:", e);
      // TODO: 에러 토스트
    } finally {
      setOptimisticGardenState(null);
      setViewPhase("IDLE");
    }
  };

  const handlePlant = async () => {
    if (!currentPlantId) return;

    // optimistic 업데이트
    setOptimisticGardenState("GROWING");

    try {
      // TODO: 실제 API 호출
      // const res = await plantSeedApi();
      // const newState = res.gardenState;

      const newState: GardenState = "GROWING";

      // 해당 식물 상태 저장
      setPlantGardenStates(prev => ({
        ...prev,
        [currentPlantId]: newState,
      }));

      setOptimisticGardenState(null);
    } catch (e) {
      console.error("씨앗 심기 실패:", e);
      setOptimisticGardenState(null);
    }
  };

  return (
    <main className="relative flex h-screen flex-col">
      {/* 배경 */}
      <GardenBackgroundColor
        gardenState={displayGardenState}
        viewPhase={viewPhase}
      />

      {/* 헤더 */}
      <GardenCareHeader
        selectTitle={selectTitle}
        onChangeSelectTitle={handleChangeSelectTitle}
      />

      {viewPhase !== "IDLE" ? (
        // viewPhase 연출 중
        <div className="flex flex-1 flex-col">
          {viewPhase === "WATERING" && (
            <Watering growthStage={currentStep?.growthStatus as GrowthStage} />
          )}
          {viewPhase === "NUTRITION_BLACK" && (
            <Nutritioning
              growthStage={currentStep?.growthStatus as GrowthStage}
            />
          )}
          {viewPhase === "NUTRITION_AFTER_SHORTLY" && (
            <NutritionAfterShortly
              growthStage={currentStep?.growthStatus as GrowthStage}
            />
          )}
        </div>
      ) : (
        // 일반 상태
        <div className="relative flex flex-1 flex-col">
          {PlantData && PlantData.length > 0 && (
            <ProgressDots total={PlantData.length} current={currentIndex + 1} />
          )}
          {PlantData && PlantData.length > 0 ? (
            <Swiper
              initialSlide={currentIndex}
              onSlideChange={swiper => {
                setCurrentIndex(swiper.activeIndex);
                setOptimisticGardenState(null); // 이벤트 핸들러에서 직접 초기화
                setViewPhase("IDLE");
              }}
              modules={[Keyboard]}
              keyboard={{ enabled: true }}
              spaceBetween={0}
              slidesPerView={1}
              className="h-full w-full flex-1"
            >
              {PlantData.map((data, idx) => {
                const isCurrent = idx === currentIndex;

                const effectiveGardenState = isCurrent
                  ? (optimisticGardenState ??
                    plantGardenStates[data.id] ??
                    (data.gardenState as GardenState))
                  : (plantGardenStates[data.id] ??
                    (data.gardenState as GardenState));

                return (
                  <SwiperSlide key={idx}>
                    <div className="flex h-full flex-col">
                      <GardenCareContent
                        growthStage={data.growthStatus as GrowthStage}
                        gardenState={effectiveGardenState}
                        percentage={data.percentage}
                        plantName={data.nickname}
                        plantSort={data.plantSort as PlantSort}
                        onWater={handleWater}
                        onNutrition={handleNutrition}
                        onPlant={handlePlant}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <>
              <section className="flex flex-1 flex-col pb-[17px]">
                <EmptyPlant />
              </section>
              <section className="z-99 flex flex-col gap-[10px]">
                <div className="px-4">
                  <ProgressSection />
                </div>
                <ActionButton activeButton={[]} />
              </section>
            </>
          )}
        </div>
      )}
    </main>
  );
};

export default GardenCare;
