export const ONBOARDING_STEPS = ["전체", "커뮤니티", "정원"] as const;
export type OnboardingStepName = (typeof ONBOARDING_STEPS)[number];

type OnboardingBackground =
  | { type: "image"; src: string }
  | { type: "class"; className: string };

export const onboardingContents: Record<
  OnboardingStepName,
  {
    title: string;
    background: OnboardingBackground;
  }
> = {
  전체: {
    title: "시니어와 가족이 조금 편하게\n연결될 수 있도록",
    background: {
      type: "image",
      src: "/images/onboarding-step-1.png",
    },
  },
  커뮤니티: {
    title: "작은 순간도 반가운 소식이\n될 수 있도록",
    background: {
      type: "image",
      src: "/images/onboarding-step-2.png",
    },
  },
  정원: {
    title: "소중한 마음을 모아 정원을\n꾸며볼까요?",
    background: {
      type: "image",
      src: "/images/onboarding-step-3.png",
    },
  },
};
