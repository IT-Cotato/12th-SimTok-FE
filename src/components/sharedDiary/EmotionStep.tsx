import { Emotion } from "@/types/emotion.type";

import { BackHeader } from "../common/BackHeader";
import ProgressDots from "../common/ProgressDot";
import { UploadTitle } from "./UploadTitle";

interface EmotionStepProps {
  emotion?: Emotion;
  onNext: (emotion: Emotion) => void;
}
export const EmotionStep = ({ emotion, onNext }: EmotionStepProps) => {
  return (
    <section className="w-full">
      <BackHeader title="공유일기쓰기" />
      <div className="mt-[1px]">
        <ProgressDots total={3} current={1} />
      </div>
      <div className="mt-[13px]">
        <UploadTitle
          title="오늘 기분은 어떠셨나요?"
          subTitle="아래 표정으로 표현해보세요!"
        />
      </div>
    </section>
  );
};
