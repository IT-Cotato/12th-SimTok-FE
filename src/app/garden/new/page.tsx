"use client";
import { useRouter } from "next/navigation";

import { useGardenStore } from "@/stores/useGardenStore";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { PageTitle } from "@/components/common/PageTitle";
import { PlantCarousel } from "@/components/garden/PlantCarousel";

import { PlantSort } from "@/types/plant.type";

const PlantGuidePage = () => {
  const router = useRouter();
  const { selectedPlant, setSelectedPlant } = useGardenStore();

  const handlePlantSelect = (sort: PlantSort | null) => {
    const nextId = selectedPlant === sort ? null : sort;
    setSelectedPlant(nextId);
  };

  const handleNextStep = () => {
    if (!selectedPlant) return;
    router.push("/garden/new/nickname");
  };

  return (
    <main className="flex h-full w-full flex-col">
      <div className="mb-2 flex flex-1 flex-col">
        <BackHeader title="식물도감" />
        <div className="mt-[51.5px]">
          <PageTitle title={["친구와 함께 키울 식물을", "골라보세요!"]} />
        </div>
        <PlantCarousel
          selectedId={selectedPlant}
          onPlantClick={handlePlantSelect}
        />
      </div>

      <div className="z-99 mb-[42px] px-4 py-[10px]">
        <FullButton
          disabled={!selectedPlant}
          isActive={!!selectedPlant}
          onClick={handleNextStep}
        >
          선택완료
        </FullButton>
      </div>
    </main>
  );
};
export default PlantGuidePage;
