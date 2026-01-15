"use client";
import Image from "next/image";

import { useState } from "react";

import { EMOTION_BUTTONS, EMOTION_ITEMS } from "@/constants/emotionItems";

interface EmotionSelectSectionProps {
  onSelect?: (value: string) => void;
}
export const EmotionSelectSection = ({
  onSelect,
}: EmotionSelectSectionProps) => {
  const [isActive, setIsActive] = useState<keyof typeof EMOTION_ITEMS>("happy");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClickItem = (index: number) => {
    setSelectedIndex(index);
    onSelect?.(`${isActive}-${index}`); // "happy-1" 형태로 전달
  };

  return (
    <section className="flex flex-col gap-[18px]">
      <div className="flex gap-[6px] px-4 py-[10px]">
        {EMOTION_BUTTONS.map(btn => (
          <button
            key={btn.key}
            onClick={() => setIsActive(btn.key as keyof typeof EMOTION_ITEMS)}
            className={`text-sub2-sb cursor-pointer rounded-2xl p-[10px] ${
              isActive === btn.key
                ? "bg-mint-01 text-white"
                : "bg-neutral-11 text-neutral-07"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 px-4">
        {Object.entries(EMOTION_ITEMS[isActive].items).map(([index, item]) => {
          const idx = Number(index);
          const isSelected = selectedIndex === idx;
          return (
            <div
              key={index}
              className={`mx-[6px] flex flex-col items-center justify-center gap-1 rounded-2xl py-[10px] ${isSelected ? "bg-mint-02" : "bg-white"} cursor-pointer`}
              onClick={() => handleClickItem(idx)}
            >
              <Image
                src={EMOTION_ITEMS[isActive].getImageSrc(Number(index))}
                alt={item.presentText}
                width={97.625}
                height={96.25}
                className="h-[96.25px] w-[97.625px]"
              />
              <span className="text-sub1-r text-black">{item.presentText}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
