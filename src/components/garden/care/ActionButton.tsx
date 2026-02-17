"use client";

import Lottie from "react-lottie-player";

import Cloud from "@/assets/garden/cloud.svg";

import { GardenAction } from "@/types/plant.type";

import needWaterAnimation from "@/public/lotties/needWater.json";

interface ActionButtonProps {
  activeButton: GardenAction[];
  onWater?: () => void;
  onNutrition?: () => void;
}
export const ActionButton = ({
  activeButton,
  onWater,
  onNutrition,
}: ActionButtonProps) => {
  const hasWater = activeButton.includes("WATER");
  const hasNutrition = activeButton.includes("NUTRITION");
  return (
    <section className="mb-[42px] flex w-full gap-4 px-4 py-[10px]">
      <button
        disabled={!hasNutrition}
        className={`${hasNutrition ? "bg-mint-01 cursor-pointer" : "bg-neutral-11"} z-[90] flex h-[58px] flex-1 items-center justify-center gap-2 rounded-2xl`}
        onClick={hasNutrition ? onNutrition : undefined}
      >
        <p className={`${!hasNutrition && "opacity-[32%]"} text-button-sb`}>
          💊
        </p>
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
          disabled={!hasWater}
          className={`${hasWater ? "bg-blue-00 cursor-pointer" : "bg-neutral-11"} relative z-[90] flex h-[58px] w-full items-center justify-center gap-2 rounded-2xl`}
          onClick={hasWater ? onWater : undefined}
        >
          <p className={`${!hasWater && "opacity-[32%]"} text-button-sb`}>☁️</p>
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
