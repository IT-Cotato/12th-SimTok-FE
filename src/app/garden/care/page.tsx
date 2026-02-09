"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

import MenuIcon from "@/assets/list.svg";

import { GlassStyleHeader } from "@/components/common/GlassStyleHeader";
import { PageTitle } from "@/components/common/PageTitle";
import { ProgressDots } from "@/components/common/ProgressDot";
import { ActionButton } from "@/components/garden/care/ActionButton";
import { EmptyPlant } from "@/components/garden/care/EmptyPlant";
import { GardenCareContent } from "@/components/garden/care/GardenCareContent";
import { ProgressSection } from "@/components/garden/care/ProgressSection";

// import PlantData from "@/mock/plantProgress.json";

import { GardenState, GrowthStage } from "@/types/plant.type";

const GardenCare = () => {
  const router = useRouter();
  const [selectTitle, setSelectTitle] = useState<"left" | "right">("left");

  const handleChangeSelectTitle = (value: "left" | "right") => {
    setSelectTitle(value);

    if (value === "left") {
      router.push("/garden");
    }
  };
  return (
    <main className="flex min-h-screen flex-col">
      <div className="relative w-full items-center justify-center">
        <GlassStyleHeader
          leftText="정원"
          rightText="키우기"
          bgColor="bg-green-05"
          selectTitle="right"
          onChangeSelectTitle={handleChangeSelectTitle}
        />
        <button className="absolute top-1/2 right-4 -translate-y-1/2 p-2">
          <MenuIcon className="text-neutral-04 h-6 w-6 cursor-pointer" />
        </button>
      </div>
      {/* {PlantData ? (
        PlantData.map((data, idx) => (
          <section key={idx}>
            <ProgressDots total={PlantData.length} current={idx} />
            <GardenCareContent
              growthStatus={data.growthStatus as GrowthStage}
              gardenState={data.gardenState as GardenState}
            />
          </section>
        ))
      ) : ( */}
      <section className="flex flex-1 flex-col pb-[17px]">
        <EmptyPlant />
      </section>

      <section className="mb-[130px] px-4">
        <ProgressSection />
      </section>
      {/* )} */}
    </main>
  );
};
export default GardenCare;
