"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import "swiper/css";
import { Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import SupportIcon from "@/assets/support.svg";

import { FullButton } from "@/components/common/FullButton";
import { GlassStyleHeader } from "@/components/common/GlassStyleHeader";
import { NavBar } from "@/components/common/NavBar";
import { PageTitle } from "@/components/common/PageTitle";
import { ProgressDots } from "@/components/common/ProgressDot";
import { GardenBackground } from "@/components/garden/BackGround";
import { GardenRules } from "@/components/garden/GardenRules";
import { PlantColletction } from "@/components/garden/PlantColletction";

import { PLANTS_PER_PAGE } from "@/constants/garden/gardenHome";

import { GardenPlantItem } from "@/types/plant.type";

import { getPlantList } from "../api/garden/care.api";

const Garden = () => {
  const router = useRouter();

  const [selectTitle, setSelectTitle] = useState<"left" | "right">("left");
  const [openRules, setOpenRules] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [allPlants, setAllPlants] = useState<GardenPlantItem[]>([]);
  const [plantCompleted, setPlantCompleted] = useState<GardenPlantItem[]>([]);

  useEffect(() => {
    const fetchPlantList = async () => {
      try {
        const [growingRes, completedRes] = await Promise.all([
          getPlantList("GROWING"),
          getPlantList("COMPLETED"),
        ]);

        setAllPlants(growingRes.sharedPlants ?? []);
        setPlantCompleted(completedRes.sharedPlants ?? []);
        console.log("growningRes", growingRes);
        console.log("completedRes", completedRes.sharedPlants);
      } catch (error) {
        console.error("식물 목록을 불러오는데 실패했습니다.", error);
      }
    };

    fetchPlantList();
  }, []);

  const havePlant = allPlants.length > 0;
  const haveFlower = plantCompleted.length > 0;
  const carouselPage = Math.ceil(plantCompleted.length / PLANTS_PER_PAGE);

  const handleChangeSelectTitle = (value: "left" | "right") => {
    setSelectTitle(value);

    if (value === "right") {
      router.push("/garden/care");
    }
  };

  return (
    <GardenBackground noPlant={!haveFlower}>
      <div className="relative w-full items-center justify-center">
        <GlassStyleHeader
          backHeader={false}
          leftText="정원"
          rightText="키우기"
          bgColor="bg-brown"
          selectTitle={selectTitle}
          onChangeSelectTitle={handleChangeSelectTitle}
        />
        <button
          className="absolute top-1/2 right-4 -translate-y-1/2 p-2"
          onClick={() => setOpenRules(true)}
          aria-label="정원 규칙 열기"
        >
          <SupportIcon className="text-neutral-04 h-6 w-6 cursor-pointer" />
        </button>
      </div>
      <div className="mt-[40px]">
        {carouselPage > 1 && (
          <div>
            <ProgressDots total={carouselPage} current={currentPage + 1} />
          </div>
        )}

        <PageTitle
          title={
            havePlant
              ? []
              : ["지금은 돌보는 식물이 없어요", "새로운 식물을 키워볼까요?"]
          }
        />
      </div>
      {havePlant && (
        <section className="absolute bottom-[180px] left-1/2 z-[70] w-full -translate-x-1/2">
          <div className="mx-auto -mb-[10px] max-w-[440px]">
            <Swiper
              modules={[Keyboard]}
              keyboard={{ enabled: true }}
              slidesPerView={1}
              className="overflow-hidden"
              onSlideChange={swiper => setCurrentPage(swiper.activeIndex)}
            >
              {Array.from({
                length: carouselPage,
              }).map((_, pageIndex) => (
                <SwiperSlide key={pageIndex}>
                  <PlantColletction
                    plantList={plantCompleted as GardenPlantItem[]}
                    pageIndex={pageIndex}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
      <section className="absolute bottom-[112px] left-1/2 z-[90] w-full -translate-x-1/2">
        <div className="w-full px-4">
          <FullButton onClick={() => router.push("/garden/new")}>
            식물 키우러가기
          </FullButton>
        </div>
      </section>
      <NavBar />
      {openRules && (
        <div
          className="bg-neutral-01/83 fixed inset-y-0 left-1/2 z-[100] flex w-full max-w-[440px] -translate-x-1/2 items-center justify-center px-4"
          onClick={() => setOpenRules(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-[440px] rounded-2xl bg-white shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <GardenRules modalClose={() => setOpenRules(false)} />
          </div>
        </div>
      )}
    </GardenBackground>
  );
};
export default Garden;
