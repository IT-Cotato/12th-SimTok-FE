import FullButton from "@/components/FullButton";

import type { OnboardingStepName } from "../config/onboardingSteps";
import { onboardingContents } from "../config/onboardingSteps";

interface Props {
  stepName: OnboardingStepName;
  isLast: boolean;
  onNext: () => void;
}

const OnboardingStep = ({ stepName, isLast, onNext }: Props) => {
  const { title, background } = onboardingContents[stepName];

  return (
    <main className="relative flex flex-1 flex-col items-center justify-between overflow-hidden bg-white pt-18 whitespace-pre-line">
      <BackgroundLayer type={background} />
      {/* 텍스트 영역 */}
      <section className="relative h-110 w-full">
        <div className="text-d2 text-neutral-02">{title}</div>
      </section>

      {/* 하단 버튼 */}
      <section className="flex w-full justify-center">
        <FullButton
          type="button"
          onClick={onNext}
          isActive={true}
          activeClass="bg-mint-01 text-white text-button-sb"
          inactiveClass="border border-neutral-08 bg-white text-neutral-06 text-button-sb"
        >
          {isLast ? "프로필 설정하기" : "다음"}
        </FullButton>
      </section>
    </main>
  );
};

export default OnboardingStep;

type BackgroundType =
  | "bg-onboarding-circle-mint"
  | "top-gradient"
  | "mint-yellow-center"
  | "yellow-right"
  | "yellow-left"
  | "none";

function BackgroundLayer({ type }: { type: BackgroundType }) {
  if (type === "none") return null;

  return (
    <div className="pointer-events-none absolute inset-0">
      {type === "bg-onboarding-circle-mint" && (
        <>
          <div className="bg-onboarding-circle-mint absolute top-[35%] left-[-15%] h-[221px] w-[221px]" />
          <div className="bg-onboarding-circle-gray absolute right-[-10%] bottom-[12%] h-[221px] w-[221px]" />
        </>
      )}
    </div>
  );
}
