"use client";

import { useFunnel } from "@use-funnel/next";

import type { OnboardingStepName } from "@/constants/onboardingSteps";

export type OnboardingFunnelContext = Record<OnboardingStepName, object>;

export const useOnboardingFunnel = () =>
  useFunnel<OnboardingFunnelContext>({
    id: "onboarding-funnel",
    initial: {
      step: "전체",
      context: {},
    },
  });
