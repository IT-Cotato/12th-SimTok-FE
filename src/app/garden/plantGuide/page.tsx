"use client";
import { useState } from "react";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { PageTitle } from "@/components/common/PageTitle";
import { PlantCarousel } from "@/components/garden/PlantCarousel";

const PlantGuidePage = () => {
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  const handlePlantSelect = (id: string) => {
    setSelectedPlantId(prev => (prev === id ? null : id));
    console.log("선택된 식물 ID:", id);
  };

  return (
    <main className="flex h-full w-full flex-col">
      <div className="flex flex-1 flex-col">
        <BackHeader title="식물도감" />
        <div className="mt-[51.5px]">
          <PageTitle>
            친구와 함께 키울 식물을
            <br /> 골라보세요!
          </PageTitle>
        </div>
        <PlantCarousel
          selectedId={selectedPlantId}
          onPlantClick={handlePlantSelect}
        />
      </div>

      <div className="mb-[42px] px-4 py-[10px]">
        <FullButton isActive={!!selectedPlantId}>선택완료</FullButton>
      </div>
    </main>
  );
};
export default PlantGuidePage;
