export const ONBOARDING_STEPS = ["전체", "커뮤니티", "정원"] as const;

export type OnboardingStepName = (typeof ONBOARDING_STEPS)[number];

export type OnboardingFunnelSteps = {
  전체: object;
  커뮤니티: object;
  정원: object;
};

type OnboardingBackground =
  | { type: "image"; src: string }
  | { type: "class"; className: string };

export const ONBOARDING_CONTENTS: Record<
  OnboardingStepName,
  {
    title: string;
    background: OnboardingBackground;
  }
> = {
  전체: {
    title: "가족에게 건넬 말을\n쉽게 골라요",
    background: {
      type: "image",
      src: "/images/onboarding-step-1.svg",
    },
  },
  커뮤니티: {
    title: "사진과 글로\n하루의 기분을 나눠요",
    background: {
      type: "image",
      src: "/images/onboarding-step-2.svg",
    },
  },
  정원: {
    title: "함께 식물을 키우며\n마음을 나눠요",
    background: {
      type: "image",
      src: "/images/onboarding-step-3.svg",
    },
  },
};
