"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

import MenuIcon from "@/assets/list.svg";

import { GlassStyleHeader } from "@/components/common/GlassStyleHeader";
import { PageTitle } from "@/components/common/PageTitle";

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
    <main className="w-full">
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
      <section>
        <PageTitle>
          아직 키우고 있는 식물이 없어요!
          <br /> 정원에서 식물을 골라보세요
        </PageTitle>
      </section>
    </main>
  );
};
export default GardenCare;
