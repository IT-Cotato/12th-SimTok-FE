"use client";

import { useRouter } from "next/navigation";

import OnboardingStep from "@/components/onboarding/OnboardingStep";
import ProgressDots from "@/components/onboarding/ProgressDots";

import {
  ONBOARDING_STEPS,
  OnboardingStepName,
} from "@/constants/onboardingSteps";

import { useFunnel } from "@/hooks/useFunnel";

const OnboardingPage = () => {
  const router = useRouter();
  const { Funnel, Step, setStep, currentStep } = useFunnel(ONBOARDING_STEPS[0]);

  const currentIndex = ONBOARDING_STEPS.indexOf(
    currentStep as OnboardingStepName,
  );
  const isLastStep = currentIndex === ONBOARDING_STEPS.length - 1;

  const goNext = () => {
    const next = ONBOARDING_STEPS[currentIndex + 1];

    if (!next) {
      localStorage.setItem("onboardingDone", "true");
      router.push("/onboarding/profile");
      return;
    }
    setStep(next);
  };

  return (
    <section className="flex min-h-dvh justify-center">
      <div className="mt-[13px] flex h-full w-full flex-col">
        <ProgressDots total={ONBOARDING_STEPS.length} current={currentIndex} />

        <Funnel>
          {ONBOARDING_STEPS.map((name: OnboardingStepName) => (
            <Step key={name} name={name}>
              <OnboardingStep
                stepName={name}
                isLastStep={isLastStep}
                onNext={goNext}
              />
            </Step>
          ))}
        </Funnel>
      </div>
    </section>
  );
};

export default OnboardingPage;
