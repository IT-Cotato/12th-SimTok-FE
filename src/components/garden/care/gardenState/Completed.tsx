import Image from "next/image";

import Pot from "@/assets/garden/pot.svg";

import { PageTitle } from "@/components/common/PageTitle";

import { GARDEN_STATE_ITEM } from "@/constants/garden/gardenCare";
import { PLANT_SORT_INFO } from "@/constants/garden/plantList";

import { PlantSort } from "@/types/plant.type";

interface CompletedProps {
  plantSort: PlantSort;
}
export const Completed = ({ plantSort }: CompletedProps) => {
  const plantImg = PLANT_SORT_INFO.find(item => item.id === plantSort)?.img;
  const pageTitle = GARDEN_STATE_ITEM.find(
    item => item.state === "COMPLETED",
  )?.title;

  return (
    <section className="z-99 flex flex-1 flex-col justify-between">
      <PageTitle title={pageTitle} />
      <div className="relative z-99 flex items-center justify-center">
        {/* 식물 이미지 */}
        <div className="relative flex items-center justify-center">
          <div className="absolute bottom-[153px] left-1/2 flex w-max -translate-x-1/2 flex-col items-center">
            {plantImg && (
              <Image
                src={plantImg}
                alt="식물이미지"
                width={149}
                height={224}
                className="h-auto object-contain" // 비율 유지하며 꽉 차게
              />
            )}
          </div>
          {/* 화분 */}
          <Pot className="h-[187px] w-[203px]" />
        </div>
      </div>
    </section>
  );
};
