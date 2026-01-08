"use client";
import { useState } from "react";

import { Emotion } from "@/types/emotion.type";

import { BackHeader } from "../common/BackHeader";
import { FullButton } from "../common/FullButton";
import { ProgressDots } from "../common/ProgressDot";
import { EmotionSelectSection } from "./EmotionSelectSection";
import { UploadTitle } from "./UploadTitle";

interface EmotionStepProps {
  emotion?: Emotion;
  onNext: (emotion: Emotion) => void;
}
export const EmotionStep = ({
  emotion: initialEmotion,
  onNext,
}: EmotionStepProps) => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  console.log(selectedEmotion);
  return (
    <main className="flex w-full flex-col">
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
      <div className="pb-[112px]">
        <EmotionSelectSection onSelect={value => setSelectedEmotion(value)} />
      </div>
      <div className="fixed bottom-0 h-[119px] w-screen max-w-[440px] bg-white px-4 py-[10px]">
        <FullButton
          isActive={!!selectedEmotion}
          onClick={() => selectedEmotion && onNext(selectedEmotion as Emotion)}
        >
          <p>다음</p>
        </FullButton>
      </div>
    </main>
  );
};
