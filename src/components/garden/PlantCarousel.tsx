import Image from "next/image";

import { useState } from "react";

import "swiper/css";
import { Keyboard } from "swiper/modules";
import { SwiperClass } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";

import StarFill from "@/assets/garden/star-fill.svg";
import StarStroke from "@/assets/garden/star-stroke.svg";

import { PLANT_SORT_INFO } from "@/constants/garden/plantList";

import { PlantSort } from "@/types/plant.type";

import { ProgressDots } from "../common/ProgressDot";

interface PlantCarouselProps {
  selectedId: string | null;
  onPlantClick: (id: PlantSort | null) => void;
}

export const PlantCarousel = ({
  selectedId,
  onPlantClick,
}: PlantCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveIndex(swiper.activeIndex);
    if (selectedId !== null) {
      onPlantClick(null);
    }
  };

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4">
      <ProgressDots total={PLANT_SORT_INFO.length} current={activeIndex + 1} />
      <div className="-my-5 w-full overflow-hidden px-4 py-5">
        <Swiper
          modules={[Keyboard]}
          keyboard={{ enabled: true }}
          spaceBetween={16}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          className="mx-auto w-full max-w-[408px] !overflow-visible"
        >
          {PLANT_SORT_INFO.map(plant => (
            <SwiperSlide key={plant.id}>
              <div
                onClick={() => onPlantClick(plant.id)}
                style={{
                  boxShadow: selectedId === plant.id ? plant.shadow : undefined,
                  transition: "all 0.3s ease-in-out",
                }}
                className="relative flex h-[451px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-[0_0_14px_0_rgba(0,0,0,0.12)]"
              >
                {/* 상단 텍스트 영역 */}
                <section className="relative z-10 flex px-4 py-[10px]">
                  <div
                    className={`text-sub-number ${plant.textColor} ${plant.bgColor} rounded-2xl px-4`}
                  >
                    {plant.name}
                  </div>
                </section>

                {/* 식물 이미지 */}
                <figure className="absolute bottom-[137px] left-1/2 z-20 -translate-x-1/2">
                  <Image
                    src={plant.img}
                    alt={plant.id}
                    width={178}
                    height={222}
                  />
                </figure>

                {/* 하단 영역 (137px 고정) */}
                <section
                  className={`mt-auto flex h-[137px] w-full flex-col items-start justify-center gap-4 px-6 ${plant.bgColor} z-10`}
                >
                  <div className="flex gap-1">
                    <p className={`${plant.textColor} text-h3`}>난이도</p>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) =>
                        i < plant.difficulty ? (
                          <StarFill key={i} />
                        ) : (
                          <StarStroke key={i} />
                        ),
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {plant.meanings.map((meaning, i) => (
                      <div
                        key={i}
                        className={`${plant.textColor} text-h3 rounded-2xl bg-white px-2 py-[5px]`}
                      >
                        #{meaning}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
