"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import "swiper/css";
import { Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ProgressDots } from "@/components/common/ProgressDot";
import { GardenAnimationView } from "@/components/garden/care/GardenAnimationView";
import { GardenBackgroundColor } from "@/components/garden/care/GardenBackgrounColor";
import { GardenCareContent } from "@/components/garden/care/GardenCareContent";
import { GardenCareHeader } from "@/components/garden/care/GardenCareHeader";

import { useGardenStatus } from "@/hooks/useGardenStatus";

import PlantDataRaw from "@/mock/plantProgress.json";

import { GardenPlantItem } from "@/types/plant.type";

const GardenCare = () => {
  const router = useRouter();
  const gardenData = PlantDataRaw as GardenPlantItem[];
  const plants = gardenData;

  const [selectTitle, setSelectTitle] = useState<"left" | "right">("right");

  const {
    currentIndex,
    setCurrentIndex,
    viewPhase,
    setViewPhase,
    optimisticState,
    plantStatuses,
    currentPlant,
    handleAction,
  } = useGardenStatus(plants);

  const displayState =
    optimisticState ??
    (currentPlant
      ? plantStatuses[currentPlant.sharedPlantId].gardenState
      : "EMPTY");

  const handleNav = (value: "left" | "right") => {
    setSelectTitle(value);
    if (value === "left") router.push("/garden");
  };

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
          stage={currentPlant.growthStage}
        />
      ) : (
        <div className="relative flex flex-1 flex-col">
          {plants.length > 0 && (
            <ProgressDots total={plants.length} current={currentIndex + 1} />
          )}

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
            {plants.map(plant => (
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
                    handleAction(plant.sharedPlantId, "AFTER_NUTRITION", [
                      { phase: "NUTRITION_BLACK", duration: 1000 },
                      { phase: "NUTRITION_AFTER_SHORTLY", duration: 1000 },
                    ])
                  }
                  onPlant={() =>
                    handleAction(plant.sharedPlantId, "GROWING", [])
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
};

export default GardenCare;
