export const ONBOARDING_STEPS = [
  "전체",
  "채팅",
  "커뮤니티1",
  "커뮤니티2",
  "정원",
  "프로필",
] as const;

export type OnboardingStepName = (typeof ONBOARDING_STEPS)[number];

type BackgroundType =
  | "bg-onboarding-circle-mint" // 1번
  | "top-gradient" // 2번 (상단 전체 배경)
  | "mint-yellow-center" // 3번
  | "yellow-right" // 4번
  | "yellow-left" // 5번
  | "none"; // 6번 (프로필)

export const onboardingContents: Record<
  OnboardingStepName,
  { title: string; background: BackgroundType }
> = {
  전체: {
    title: "시니어와 가족이 조금 더 자주,\n조금 더 편하게 연결될 수 있도록",
    background: "bg-onboarding-circle-mint",
  },
  채팅: {
    title: "무슨 말을 해야할지 막힐 때,\n추천 문장으로 도와줄게요.",
    background: "top-gradient",
  },
  커뮤니티1: {
    title:
      "하루한컷으로 하루를 공유해요.\n작은 순간도 가족에게는 반가운\n소식이 됩니다.",
    background: "mint-yellow-center",
  },
  커뮤니티2: {
    title: "공유일기로 하루의 감정을 기록\n하며 가족들과 더욱 가까워져요.",
    background: "yellow-right",
  },
  정원: {
    title:
      "가족과 함께 씨앗을 심고\n예쁜 정원을 만들어보세요.\n작은 성취감과 따듯한 유대감이\n자라납니다.",
    background: "yellow-left",
  },
  프로필: {
    title: "가족들에게 보여줄 내 프로필을\n만들어주세요.",
    background: "none",
  },
};
