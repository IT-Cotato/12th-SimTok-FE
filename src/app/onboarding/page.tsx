// src/app/onboarding/page.tsx
"use client";

import { useRouter } from "next/navigation";

import React from "react";

import OnboardingStep from "./components/OnboardingStep";
import ProgressDots from "./components/ProgressDots";
import { ONBOARDING_STEPS, OnboardingStepName } from "./config/onboardingSteps";
import { useFunnel } from "./hooks/useFunnel";

const OnboardingPage = () => {
  const router = useRouter();
  const { Funnel, Step, setStep, currentStep } = useFunnel(ONBOARDING_STEPS[0]);

  const currentIndex = ONBOARDING_STEPS.indexOf(
    currentStep as OnboardingStepName,
  );
  const isLast = currentIndex === ONBOARDING_STEPS.length - 1;

  const goNext = () => {
    const next = ONBOARDING_STEPS[currentIndex + 1];

    if (!next) {
      localStorage.setItem("onboardingDone", "true");
      router.push("/home");
      return;
    }
    setStep(next);
  };

  return (
    <main className="flex flex-col justify-center">
      <div className="mt-[13px] flex h-full w-110 flex-col px-4">
        <ProgressDots total={ONBOARDING_STEPS.length} current={currentIndex} />

        <Funnel>
          {ONBOARDING_STEPS.map(name => (
            <Step key={name} name={name}>
              <OnboardingStep stepName={name} isLast={isLast} onNext={goNext} />
            </Step>
          ))}
        </Funnel>
      </div>
    </main>
  );
};

export default OnboardingPage;
