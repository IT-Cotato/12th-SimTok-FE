"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

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

interface PlantStatusInfo {
  gardenState: GardenState;
  isMe: boolean;
}

const GardenCare = () => {
  const router = useRouter();
  const [selectTitle, setSelectTitle] = useState<"left" | "right">("right");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewPhase, setViewPhase] = useState<ViewPhase>("IDLE");

  // 1. 각 식물별 최신 상태(gardenState + isMe)를 통합 관리
  const [plantStatuses, setPlantStatuses] = useState<
    Record<number, PlantStatusInfo>
  >(
    PlantData.reduce(
      (acc, item) => {
        acc[item.sharedPlantId] = {
          gardenState: item.gardenState as GardenState,
          isMe: item.lastWateredBy.isMe,
        };
        return acc;
      },
      {} as Record<number, PlantStatusInfo>,
    ),
  );

  // 애니메이션 중 보여줄 임시 상태
  const [optimisticGardenState, setOptimisticGardenState] =
    useState<GardenState | null>(null);

  const currentStep = PlantData?.[currentIndex];
  const currentPlantId = currentStep?.sharedPlantId;

  // 배경색 결정을 위한 현재 슬라이드 상태 계산
  const currentStatus = currentPlantId ? plantStatuses[currentPlantId] : null;
  const displayGardenState =
    optimisticGardenState ?? currentStatus?.gardenState ?? "EMPTY";

  const handleChangeSelectTitle = (value: "left" | "right") => {
    setSelectTitle(value);
    if (value === "left") router.push("/garden");
  };

  // --- 핸들러 영역 ---

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

      // 영양제 완료 후 상태 업데이트 (isMe를 true로 설정하여 내 턴 종료)
      setPlantStatuses(prev => ({
        ...prev,
        [currentPlantId]: {
          gardenState: "AFTER_NUTRITION",
          isMe: true,
        },
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

      // 물주기 완료 후 상태 업데이트 (isMe를 true로 설정하여 내 턴 종료)
      setPlantStatuses(prev => ({
        ...prev,
        [currentPlantId]: {
          gardenState: "WATERED_RECENTLY",
          isMe: true,
        },
      }));
    } catch (e) {
      console.error("물주기 실패:", e);
    } finally {
      setOptimisticGardenState(null);
      setViewPhase("IDLE");
    }
  };

  const handlePlant = async () => {
    if (!currentPlantId) return;
    setOptimisticGardenState("GROWING");

    try {
      // API 호출 가정
      setPlantStatuses(prev => ({
        ...prev,
        [currentPlantId]: {
          gardenState: "GROWING",
          isMe: true,
        },
      }));
    } catch (e) {
      console.error("씨앗 심기 실패:", e);
    } finally {
      setOptimisticGardenState(null);
    }
  };

  return (
    <main className="relative flex h-screen flex-col">
      <GardenBackgroundColor
        gardenState={displayGardenState}
        viewPhase={viewPhase}
      />

      <GardenCareHeader
        selectTitle={selectTitle}
        onChangeSelectTitle={handleChangeSelectTitle}
      />

      {viewPhase !== "IDLE" ? (
        // 연출 페이즈 (애니메이션)
        <div className="flex flex-1 flex-col">
          {viewPhase === "WATERING" && (
            <Watering growthStage={currentStep?.growthStage as GrowthStage} />
          )}
          {viewPhase === "NUTRITION_BLACK" && (
            <Nutritioning
              growthStage={currentStep?.growthStage as GrowthStage}
            />
          )}
          {viewPhase === "NUTRITION_AFTER_SHORTLY" && (
            <NutritionAfterShortly
              growthStage={currentStep?.growthStage as GrowthStage}
            />
          )}
        </div>
      ) : (
        // 일반 정원 관리 페이즈
        <div className="relative flex flex-1 flex-col">
          {PlantData && PlantData.length > 0 && (
            <ProgressDots total={PlantData.length} current={currentIndex + 1} />
          )}

          {PlantData && PlantData.length > 0 ? (
            <Swiper
              initialSlide={currentIndex}
              onSlideChange={swiper => {
                setCurrentIndex(swiper.activeIndex);
                setOptimisticGardenState(null);
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

                // 최신 로컬 상태 참조
                const currentLocalStatus = plantStatuses[data.sharedPlantId];

                // 현재 애니메이션 중이라면 낙관적 UI 적용, 아니면 로컬 상태 적용
                const effectiveGardenState =
                  isCurrent && optimisticGardenState
                    ? optimisticGardenState
                    : currentLocalStatus.gardenState;

                // 내 턴 계산: 마지막 물 준 사람이 내가 아니면 내 턴임
                const myTurn = !currentLocalStatus.isMe;

                return (
                  <SwiperSlide key={data.sharedPlantId}>
                    <div className="flex h-full flex-col">
                      <GardenCareContent
                        growthStage={data.growthStage as GrowthStage}
                        gardenState={effectiveGardenState}
                        percentage={data.percentage}
                        plantName={data.nickname}
                        plantSort={data.plantName as PlantSort}
                        myTurn={myTurn} // 버튼 클릭 후 리렌더링되며 자동으로 반영됨
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
