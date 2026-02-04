"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

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

import plantList from "@/mock/plantProgress.json";

const Garden = () => {
  const router = useRouter();

  const [selectTitle, setSelectTitle] = useState<"left" | "right">("left");
  const [openRules, setOpenRules] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const havePlant = plantList.length > 0;
  const carouselPage = Math.ceil(plantList.length / 7);

  const handleChangeSelectTitle = (value: "left" | "right") => {
    setSelectTitle(value);

    if (value === "right") {
      router.push("/garden/care");
    }
  };
  return (
    <GardenBackground noPlant={!havePlant}>
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
        >
          <SupportIcon className="text-neutral-04 h-6 w-6 cursor-pointer" />
        </button>
      </div>
      <div className="mt-[53.5px]">
        <PageTitle>
          {havePlant ? (
            <>
              정원이 한층 더 풍성해졌네요! <br />
              다른 식물도 키워볼까요?
            </>
          ) : (
            <>
              친구와 함께 식물도 키우고 <br /> 정원도 꾸며볼까요?
            </>
          )}
        </PageTitle>
        {carouselPage > 1 && (
          <ProgressDots total={carouselPage} current={currentPage + 1} />
        )}
      </div>
      {havePlant && (
        <section className="absolute bottom-[180px] left-1/2 z-70 w-full -translate-x-1/2">
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
                    plantList={plantList}
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
          className="bg-neutral-01/83 fixed inset-y-0 left-1/2 z-[100] flex max-w-[440px] -translate-x-1/2 items-center justify-center px-4"
          onClick={() => setOpenRules(false)}
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
