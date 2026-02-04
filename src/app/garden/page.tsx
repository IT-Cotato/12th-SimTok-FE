"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

import SupportIcon from "@/assets/support.svg";

import { GlassStyleHeader } from "@/components/common/GlassStyleHeader";
import { GardenRules } from "@/components/garden/GardenRules";

const Garden = () => {
  const router = useRouter();

  const [selectTitle, setSelectTitle] = useState<"left" | "right">("left");
  const [openRules, setOpenRules] = useState(false);

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
        <button
          className="absolute top-1/2 right-4 -translate-y-1/2 p-2"
          onClick={() => setOpenRules(true)}
        >
          <SupportIcon className="text-neutral-04 h-6 w-6 cursor-pointer" />
        </button>
      </div>
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
    </main>
  );
};
export default Garden;
