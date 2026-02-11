"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { ProgressDots } from "@/components/common/ProgressDot";
import { ActionButton } from "@/components/garden/care/ActionButton";
import { GardenBackgroundColor } from "@/components/garden/care/GardenBackgrounColor";
import { GardenCareContent } from "@/components/garden/care/GardenCareContent";
import { GardenCareHeader } from "@/components/garden/care/GardenCareHeader";
import { ProgressSection } from "@/components/garden/care/ProgressSection";
import { EmptyPlant } from "@/components/garden/care/gardenState/EmptyPlant";

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
    (currentStep?.gardenState as GardenState) ?? "EMPTY",
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
  console.log(currentIndex);

  return (
    <main className="relative flex min-h-screen flex-col">
      {/* 배경 */}
      <GardenBackgroundColor
        gardenState={"AFTER_NUTRITION"}
        viewPhase={viewPhase}
      />

      {/* 헤더 */}
      <GardenCareHeader
        selectTitle={selectTitle}
        onChangeSelectTitle={handleChangeSelectTitle}
      />

      {/* ProgressDots: PlantData 있을 때만 */}
      {PlantData && PlantData.length > 0 && (
        <ProgressDots total={PlantData.length} current={currentIndex + 1} />
      )}

      {PlantData && PlantData.length > 0 ? (
        // <Swiper
        //   onSlideChange={swiper => setCurrentIndex(swiper.activeIndex)}
        //   keyboard={true}
        //   spaceBetween={0}
        //   slidesPerView={1}
        // >
        //   {PlantData.map((data, idx) => (
        //     <SwiperSlide key={idx}>
        //       <GardenCareContent
        //         growthStatus={data.growthStatus as GrowthStage}
        //         gardenState={displayGardenState}
        //       />
        //     </SwiperSlide>
        //   ))}
        // </Swiper>
        <div className="flex flex-1 flex-col">
          <GardenCareContent
            gardenState="COMPLETED"
            growthStage="BLOOM"
            percentage={30}
            plantName="두쫀쿠"
            plantSort="daisy"
          />
        </div>
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
    </main>
  );
};
export default GardenCare;
