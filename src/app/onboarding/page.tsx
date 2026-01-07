"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import OnboardingStep from "@/components/onboarding/OnboardingStep";
import ProgressDots from "@/components/onboarding/ProgressDots";

import {
  ONBOARDING_STEPS,
  type OnboardingStepName,
} from "@/constants/onboardingSteps";

const OnboardingPage = () => {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStepName = ONBOARDING_STEPS[
    currentStepIndex
  ] as OnboardingStepName;
  const isLastStep = currentStepIndex === ONBOARDING_STEPS.length - 1;

  const goNext = () => {
    const nextIndex = currentStepIndex + 1;

    if (nextIndex >= ONBOARDING_STEPS.length) {
      if (typeof window !== "undefined") {
        localStorage.setItem("onboardingDone", "true");
      }
      router.push("/onboarding/profile");
      return;
    }

    setCurrentStepIndex(nextIndex);
  };

  return (
    <section className="flex min-h-dvh justify-center">
      <div className="relative mt-[73px] flex h-full flex-col">
        <div className="z-10">
          <ProgressDots
            total={ONBOARDING_STEPS.length}
            current={currentStepIndex}
          />
        </div>

        <OnboardingStep
          stepName={currentStepName}
          isLastStep={isLastStep}
          onNext={goNext}
        />
      </div>
    </section>
  );
};

export default OnboardingPage;
