"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

import SupportIcon from "@/assets/support.svg";

import { GlassStyleHeader } from "@/components/common/GlassStyleHeader";

const Garden = () => {
  const router = useRouter();

  const [selectTitle, setSelectTitle] = useState<"left" | "right">("left");

  const handleChangeSelectTitle = (value: "left" | "right") => {
    setSelectTitle(value);

    if (value === "right") {
      router.push("/garden/care");
    }
  };
  return (
    <main className="relative h-full w-full bg-[#84C7F9]">
      <div className="relative w-full items-center justify-center">
        <GlassStyleHeader
          backHeader={false}
          leftText="정원"
          rightText="키우기"
          bgColor="bg-brown"
          selectTitle={selectTitle}
          onChangeSelectTitle={handleChangeSelectTitle}
        />
        <button className="absolute top-1/2 right-4 -translate-y-1/2 p-2">
          <SupportIcon />
        </button>
      </div>
    </main>
  );
};
export default Garden;
