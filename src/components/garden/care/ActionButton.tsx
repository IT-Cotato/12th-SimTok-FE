"use client";

import Lottie from "react-lottie-player";

import Cloud from "@/assets/garden/cloud.svg";
import PillIcon from "@/assets/garden/pill.svg";

import { GardenAction } from "@/types/plant.type";

import needWaterAnimation from "@/public/lotties/needWater.json";

interface ActionButtonProps {
  activeButton: GardenAction[];
}
export const ActionButton = ({ activeButton }: ActionButtonProps) => {
  const hasWater = activeButton.includes("WATER");
  const hasNutrition = activeButton.includes("NUTRITION");
  return (
    <section className="mb-[42px] flex w-full gap-4 px-4 py-[10px]">
      <button
        className={`${hasNutrition ? "bg-mint-01 cursor-pointer" : "bg-neutral-11"} flex h-[58px] flex-1 items-center justify-center gap-2 rounded-2xl`}
      >
        <p className="text-button-sb">💊</p>
        <p
          className={`${hasNutrition ? "text-white" : "text-neutral-07"} text-button-sb`}
        >
          영양제
        </p>
      </button>

      <div className="relative flex flex-1">
        {hasWater && (
          <div className="absolute -bottom-[48px] left-1/2 z-[50] origin-bottom -translate-x-1/2 scale-[2]">
            <Lottie
              play
              animationData={needWaterAnimation}
              loop
              speed={10}
              style={{ width: 150, height: 133 }}
            />
          </div>
        )}

        <button
          className={`${hasWater ? "bg-blue-00 cursor-pointer" : "bg-neutral-11"} relative z-[90] flex h-[58px] w-full items-center justify-center gap-2 rounded-2xl`}
        >
          <p className="text-button-sb">☁️</p>
          <p
            className={`${hasWater ? "text-white" : "text-neutral-07"} text-button-sb`}
          >
            물주기
          </p>
        </button>
      </div>
    </section>
  );
};
