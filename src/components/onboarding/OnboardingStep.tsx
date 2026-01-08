"use client";

import Image from "next/image";

import { FullButton } from "@/components/common/FullButton";

import type { OnboardingStepName } from "@/constants/onboardingSteps";
import { ONBOARDING_CONTENTS } from "@/constants/onboardingSteps";

interface Props {
  stepName: OnboardingStepName;
  isLastStep: boolean;
  onNext: () => void;
}

const OnboardingStep = ({ stepName, isLastStep, onNext }: Props) => {
  const { title, background } = ONBOARDING_CONTENTS[stepName];

  return (
    <div className="flex min-h-dvh justify-center">
      <div className="relative flex h-full w-[440px] flex-col pt-[558px]">
        {background.type === "image" && (
          <Image
            src={background.src}
            alt=""
            fill
            priority
            className="pointer-events-none -translate-y-[120px] object-cover object-top"
          />
        )}

        {background.type === "class" && (
          <div
            className={`pointer-events-none absolute -z-10 -translate-y-[120px] ${background.className}`}
            aria-hidden
          />
        )}

        <section className="relative z-10 px-4 py-2.5">
          <p className="text-d2 text-neutral-02 whitespace-pre-line">{title}</p>
        </section>

        <section className="relative z-10 mt-[33px] px-4">
          <FullButton type="button" onClick={onNext} isActive>
            {isLastStep ? "시작하기" : "다음"}
          </FullButton>
        </section>
      </div>
    </div>
  );
};

export default OnboardingStep;
