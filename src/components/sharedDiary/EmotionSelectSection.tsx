"use client";
import Image from "next/image";

import { useState } from "react";

import { EMOTION_BUTTONS, EMOTION_ITEMS } from "@/constants/emotionItems";
import { SERVER_EMOTION_REVERSE_MAP } from "@/constants/emotionItems";

interface EmotionSelectSectionProps {
  onSelect?: (value: string) => void;
}

export const EmotionSelectSection = ({
  onSelect,
}: EmotionSelectSectionProps) => {
  const [isActive, setIsActive] = useState<keyof typeof EMOTION_ITEMS>("happy");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClickItem = (
    tabKey: keyof typeof EMOTION_ITEMS,
    index: number,
  ) => {
    setSelectedIndex(index);
    const emotionCode = SERVER_EMOTION_REVERSE_MAP[tabKey][index];
    onSelect?.(emotionCode);
  };

  return (
    <section className="flex flex-col gap-[18px]">
      {/* 탭 버튼 영역 */}
      <div className="flex gap-[6px] px-4 py-[10px]">
        {EMOTION_BUTTONS.map(btn => (
          <button
            key={btn.key}
            onClick={() => {
              setIsActive(btn.key as keyof typeof EMOTION_ITEMS);
              setSelectedIndex(null); // 탭 바뀔 때 선택 초기화
            }}
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

      {/* 모든 카테고리의 그리드를 미리 그려두고 hidden으로 토글 */}
      {Object.keys(EMOTION_ITEMS).map(tabKey => {
        const currentTabKey = tabKey as keyof typeof EMOTION_ITEMS;
        const isCurrentTabActive = isActive === currentTabKey;

        return (
          <div
            key={currentTabKey}
            className={`grid grid-cols-3 px-4 ${isCurrentTabActive ? "grid" : "hidden"}`}
          >
            {Object.entries(EMOTION_ITEMS[currentTabKey].items).map(
              ([index, item]) => {
                const idx = Number(index);
                // 현재 활성화된 탭이면서 선택된 인덱스일 때만 하이라이트
                const isSelected = isCurrentTabActive && selectedIndex === idx;

                return (
                  <div
                    key={index}
                    className={`mx-[6px] flex flex-col items-center justify-center gap-1 rounded-2xl py-[10px] ${
                      isSelected ? "bg-mint-02" : "bg-white"
                    } cursor-pointer`}
                    onClick={() => handleClickItem(currentTabKey, idx)}
                  >
                    <Image
                      src={EMOTION_ITEMS[currentTabKey].getImageSrc(idx)}
                      alt={item.presentText}
                      width={98}
                      height={96}
                      priority={true}
                      className="h-[96.25px] w-[97.625px]"
                    />
                    <span className="text-sub1-r text-black">
                      {item.presentText}
                    </span>
                  </div>
                );
              },
            )}
          </div>
        );
      })}
    </section>
  );
};
