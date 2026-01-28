"use client";
import Image from "next/image";

import { useRef } from "react";

import { FullButton } from "@/components/common/FullButton";

import type { OnboardingStepName } from "@/constants/onboardingSteps";
import { ONBOARDING_CONTENTS } from "@/constants/onboardingSteps";

interface Props {
  stepName: OnboardingStepName;
  isLastStep: boolean;
  onNext: () => void;
  onPrev: () => void;
}

const OnboardingStep = ({ stepName, isLastStep, onNext, onPrev }: Props) => {
  const { title, background } = ONBOARDING_CONTENTS[stepName];
  const [firstLine, secondLine] = title.split("\n");

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const endX = e.changedTouches[0].clientX;
    const diffX = endX - touchStartX.current;
    const threshold = 50; // 스와이프로 인정할 최소 거리(px)

    if (diffX > threshold) {
      // 오른쪽 → 왼쪽에서 오른쪽으로 드래그 (이전 스텝)
      onPrev();
    } else if (diffX < -threshold) {
      // 왼쪽 → 오른쪽으로 드래그 (다음 스텝)
      onNext();
    }

    touchStartX.current = null;
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {background.type === "image" && (
        <Image
          src={background.src}
          alt="온보딩 배경이미지"
          fill
          priority
          className="pointer-events-none -translate-y-30 object-cover object-center"
        />
      )}

      {background.type === "class" && (
        <div
          className={`pointer-events-none absolute inset-0 ${background.className}`}
          aria-hidden
        />
      )}

      <section className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-[440px]">
        <div className="flex w-full flex-col gap-[23px]">
          <p className="text-d2 text-neutral-02 px-4 py-[10px]">
            <span className="block whitespace-nowrap">{firstLine}</span>
            <span className="block whitespace-nowrap">{secondLine}</span>
          </p>
          <div className="mb-[42px] px-4 py-[10px]">
            <div className="rounded-2xl shadow-[0_0_15px_0_rgba(79,255,144,0.57)]">
              <FullButton type="button" onClick={onNext} isActive>
                {isLastStep ? "시작하기" : "다음"}
              </FullButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnboardingStep;
