"use client";
import Image from "next/image";

import { GalleryAssets } from "@/assets/GalleryIcon";

import { Emotion } from "@/types/emotion.type";

import { getEmotionMeta } from "@/utils/getEmotionMeta";

import { BackHeader } from "../common/BackHeader";
import { FullButton } from "../common/FullButton";
import ProgressDots from "../common/ProgressDot";
import { UploadTitle } from "./UploadTitle";
import { WriteStepButton } from "./WriteStepButton";

interface WriteStepProps {
  emotion: Emotion;
  defaultContent?: string;
  defaultFile?: File;
  onNext: (content: string, file: File) => void;
  onBack: () => void;
}
export const WriteStep = ({
  emotion,
  defaultContent,
  defaultFile,
  onNext,
  onBack,
}: WriteStepProps) => {
  const emotionData = getEmotionMeta(emotion);

  return (
    <main className="flex w-full flex-col">
      <BackHeader title="공유일기쓰기" />
      <div className="mt-[1px]">
        <ProgressDots total={3} current={2} />
      </div>
      <div className="mt-[13px]">
        <UploadTitle
          title="오늘의 기분이 선택되었어요."
          subTitle="공유일기를 작성해보세요."
        />
      </div>
      {emotionData && (
        <section className="flex flex-col items-center justify-center gap-[6px]">
          <Image
            src={emotionData.imageSrc}
            width={96}
            height={96}
            alt="selected-emotion"
            className="h-24 w-24"
          />
          <p className="text-sub1-r text-black">
            &ldquo;오늘 하루는 {emotionData.presentText}&rdquo;
          </p>
        </section>
      )}
      <div className="fixed bottom-[119px] mb-5 w-full max-w-[440px]">
        <WriteStepButton />
      </div>
      <div className="fixed bottom-0 h-[119px] w-screen max-w-[440px] bg-white px-4 py-[10px]">
        <FullButton>
          <p>다음</p>
        </FullButton>
      </div>
    </main>
  );
};
