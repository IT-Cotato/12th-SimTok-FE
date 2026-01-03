import Image from "next/image";

import FullButton from "@/components/common/FullButton";

import type { OnboardingStepName } from "../../config/onboardingSteps";
import { onboardingContents } from "../../config/onboardingSteps";

interface Props {
  stepName: OnboardingStepName;
  isLast: boolean;
  onNext: () => void;
}

const OnboardingStep = ({ stepName, isLast, onNext }: Props) => {
  const { title, background } = onboardingContents[stepName];

  return (
    <main className="relative flex h-screen flex-col bg-white pt-[558px]">
      {background.type === "image" && (
        <Image
          src={background.src}
          alt=""
          fill
          priority
          className="pointer-events-none -translate-y-[110px] object-cover object-top"
        />
      )}
      {background.type === "class" && (
        <div
          className={`pointer-events-none absolute -translate-y-[110px] ${background.className}`}
          aria-hidden
        />
      )}

      <section className="relative z-10 px-4 py-2.5">
        <p className="text-d2 text-neutral-02 whitespace-pre-line">{title}</p>
      </section>

      <section className="relative z-10 px-4 pt-[23px] pb-[78px]">
        <FullButton type="button" onClick={onNext} isActive>
          {isLast ? "시작하기" : "다음"}
        </FullButton>
      </section>
    </main>
  );
};

export default OnboardingStep;
