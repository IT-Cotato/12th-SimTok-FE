"use client";
import { useState } from "react";

import { BackHeader } from "../common/BackHeader";
import { FullButton } from "../common/FullButton";
import { ProgressDots } from "../common/ProgressDot";
import { SelectCalendarModal } from "../dailyRecord/SelectCalendarModal";
import { EmotionSelectSection } from "./EmotionSelectSection";
import { UploadTitle } from "./UploadTitle";

interface EmotionStepProps {
  emotion?: string;
  onNext: (emotion: string) => void;
}
export const EmotionStep = ({ emotion, onNext }: EmotionStepProps) => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  return (
    <main className="flex w-full flex-col">
      <BackHeader
        title="공유일기쓰기"
        calendarIcon={() => {
          console.log("캘린더 아이콘 클릭됨!");
          setIsCalendarOpen(true);
        }}
        iconColor="neutral-04"
      />
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
          onClick={() => selectedEmotion && onNext(selectedEmotion)}
        >
          <p>다음</p>
        </FullButton>
      </div>
      {isCalendarOpen && (
        <div
          className="fixed inset-0 z-50 mx-auto flex w-full max-w-[440px] items-center justify-center bg-black/50"
          onClick={() => setIsCalendarOpen(false)}
        >
          <div onClick={e => e.stopPropagation()}>
            <SelectCalendarModal />
          </div>
        </div>
      )}
    </main>
  );
};
