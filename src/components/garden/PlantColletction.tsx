"use client";

import { PLANTS_PER_PAGE } from "@/constants/garden/gardenHome";
import { PLANT_SORT_INFO } from "@/constants/garden/plantList";

import { GardenPlantItem } from "@/types/plant.type";

interface PlantColletctionProps {
  plantList: GardenPlantItem[];
  pageIndex: number;
}

export const PlantColletction = ({
  plantList,
  pageIndex,
}: PlantColletctionProps) => {
  const FRONT_MAX = 4;

  const start = pageIndex * PLANTS_PER_PAGE;
  const plants = plantList.slice(start, start + PLANTS_PER_PAGE);

  let frontPlants: GardenPlantItem[] = [];
  let backPlants: GardenPlantItem[] = [];

  if (plants.length <= FRONT_MAX) {
    frontPlants = plants;
  } else {
    frontPlants = plants.slice(0, FRONT_MAX);
    backPlants = plants.slice(FRONT_MAX);
  }

  return (
    <section className="flex h-[408px] w-full items-end justify-center px-4">
      <div className="flex w-full max-w-[440px] flex-col items-center gap-2">
        {/* 앞줄 (항상 아래 시각 기준 메인 줄) */}
        <div
          className={`grid w-full max-w-md justify-items-center gap-5 ${
            frontPlants.length === 4
              ? "grid-cols-4"
              : frontPlants.length === 3
                ? "grid-cols-3"
                : frontPlants.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-1"
          }`}
        >
          {frontPlants.map(plant => {
            const plantImg =
              PLANT_SORT_INFO.find(p => p.id === plant.plantName)?.img ?? "";
            return (
              <div key={plant.sharedPlantId} className="flex justify-center">
                {plantImg && (
                  <img
                    src={plantImg}
                    alt={plant.plantName}
                    className="h-[115px] object-contain"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* 뒷줄 (있을 때만 렌더) */}
        {backPlants.length > 0 && (
          <div className="grid w-full max-w-lg grid-cols-3 justify-items-center gap-4 md:gap-6">
            {backPlants.map(plant => {
              const plantImg =
                PLANT_SORT_INFO.find(p => p.id === plant.plantName)?.img ?? "";
              return (
                <div key={plant.sharedPlantId} className="flex justify-center">
                  {plantImg && (
                    <img
                      src={plantImg}
                      alt={plant.plantName}
                      className="h-[100px] object-contain opacity-90 md:h-[105px]"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
