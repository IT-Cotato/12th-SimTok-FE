"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { ProgressDots } from "@/components/common/ProgressDot";
import { EmptyPlant } from "@/components/garden/care/EmptyPlant";
import { GardenBackgroundColor } from "@/components/garden/care/GardenBackgrounColor";
import { GardenCareContent } from "@/components/garden/care/GardenCareContent";
import { GardenCareHeader } from "@/components/garden/care/GardenCareHeader";
import { ProgressSection } from "@/components/garden/care/ProgressSection";

import PlantData from "@/mock/plantProgress.json";

import { GardenState, GrowthStage, ViewPhase } from "@/types/plant.type";

import { runPhaseSequence } from "@/utils/runPhaseSequence";

const GardenCare = () => {
  const router = useRouter();
  const [selectTitle, setSelectTitle] = useState<"left" | "right">("right");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewPhase, setViewPhase] = useState<ViewPhase>("IDLE");

  const currentStep = PlantData?.[currentIndex];

  const [confirmedGardenState, setConfirmedGardenState] = useState<GardenState>(
    currentStep.gardenState as GardenState,
  );

  const [optimisticGardenState, setOptimisticGardenState] =
    useState<GardenState | null>(null);

  const displayGardenState = optimisticGardenState ?? confirmedGardenState;

  const handleChangeSelectTitle = (value: "left" | "right") => {
    setSelectTitle(value);

    if (value === "left") {
      router.push("/garden");
    }
  };

  const handleNutrition = async () => {
    // 1. optimistic update
    setOptimisticGardenState("AFTER_NUTRITION");

    // 2. 연출 시퀀스
    await runPhaseSequence(
      [
        { phase: "NUTRITION_BLACK", duration: 2000 },
        { phase: "NUTRITION_AFTER_SHORTLY", duration: 2000 },
      ],
      setViewPhase,
    );

    try {
      // TODO: 영양제 투여 API 호출
      // const res = await nutritionPlantApi();
      // setConfirmedGardenState(res.gardenState);

      // 임시: 성공 가정
      setConfirmedGardenState("AFTER_NUTRITION");
    } catch (e) {
      // TODO: 실패 처리 (토스트 등)
      // 실패 시 optimistic rollback
      setOptimisticGardenState(null);
    } finally {
      setOptimisticGardenState(null);
      setViewPhase("IDLE");
    }
  };

  const handleWater = async () => {
    // 1. optimistic update
    setOptimisticGardenState("WATERED_RECENTLY");

    // 2. 연출
    await runPhaseSequence(
      [{ phase: "WATERING", duration: 2000 }],
      setViewPhase,
    );

    try {
      // TODO: 물주기 API 호출
      // const res = await waterPlantApi();
      // setConfirmedGardenState(res.gardenState);

      // 임시: 성공 가정
      setConfirmedGardenState("WATERED_RECENTLY");
    } catch (e) {
      // TODO: 실패 처리
      setOptimisticGardenState(null);
    } finally {
      setOptimisticGardenState(null);
      setViewPhase("IDLE");
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <GardenBackgroundColor
        gardenState={currentStep.gardenState as GardenState}
        viewPhase={viewPhase}
      />
      <GardenCareHeader
        selectTitle={selectTitle}
        onChangeSelectTitle={handleChangeSelectTitle}
      />
      {PlantData ? (
        PlantData.map((data, idx) => (
          <section key={idx}>
            <ProgressDots total={PlantData.length} current={idx} />
            <GardenCareContent
              growthStatus={data.growthStatus as GrowthStage}
              gardenState={data.gardenState as GardenState}
            />
          </section>
        ))
      ) : (
        <>
          <section className="flex flex-1 flex-col pb-[17px]">
            <EmptyPlant />
          </section>
          <section className="mb-[130px] px-4">
            <ProgressSection />
          </section>
        </>
      )}
    </main>
  );
};
export default GardenCare;
