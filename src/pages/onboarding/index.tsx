import { useRouter } from "next/router";

import OnboardingStep from "@/components/onboarding/OnboardingStep";
import ProgressDots from "@/components/onboarding/ProgressDots";

import {
  ONBOARDING_STEPS,
  type OnboardingStepName,
} from "@/constants/onboardingSteps";

import { useOnboardingFunnel } from "@/hooks/useOnboardingFunnel";

const OnboardingPage = () => {
  const router = useRouter();

  const { step: currentStep, history, Render } = useOnboardingFunnel();

  const currentIndex = ONBOARDING_STEPS.indexOf(
    currentStep as OnboardingStepName,
  );
  const isLastStep = currentIndex === ONBOARDING_STEPS.length - 1;

  const goNext = () => {
    const next = ONBOARDING_STEPS[currentIndex + 1];

    if (!next) {
      if (typeof window !== "undefined") {
        localStorage.setItem("onboardingDone", "true");
      }
      router.push("/onboarding/profile");
      return;
    }

    history.push(next, {});
  };

  return (
    <section className="flex min-h-dvh justify-center">
      <div className="mt-[13px] flex h-full flex-col">
        <ProgressDots total={ONBOARDING_STEPS.length} current={currentIndex} />

        <Render
          전체={() => (
            <OnboardingStep
              stepName="전체"
              isLastStep={isLastStep}
              onNext={goNext}
            />
          )}
          커뮤니티={() => (
            <OnboardingStep
              stepName="커뮤니티"
              isLastStep={isLastStep}
              onNext={goNext}
            />
          )}
          정원={() => (
            <OnboardingStep
              stepName="정원"
              isLastStep={isLastStep}
              onNext={goNext}
            />
          )}
        />
      </div>
    </section>
  );
};

export default OnboardingPage;
