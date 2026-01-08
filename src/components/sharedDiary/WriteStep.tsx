"use client";
import Image from "next/image";

import { GalleryAssets } from "@/assets/GalleryIcon";

import { Emotion } from "@/types/emotion.type";

import { getEmotionMeta } from "@/utils/getEmotionMeta";

import { BackHeader } from "../common/BackHeader";
import { FullButton } from "../common/FullButton";
import ProgressDots from "../common/ProgressDot";
import { UploadTitle } from "./UploadTitle";

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
      <section className="fixed bottom-[119px] mb-5 w-full max-w-[440px]">
        <div className="flex justify-between px-4">
          <button className="bg-neutral-11 border-mint-01 h-[95px] max-w-[196px] flex-1 cursor-pointer rounded-2xl border border-solid px-[10px] py-[10px] pt-[20px]">
            <div className="inline-flex items-center justify-center rounded-2xl bg-white p-[10px]">
              <GalleryAssets />
            </div>
            <p>사진추가하기</p>
          </button>
          <button className="bg-neutral-11 border-mint-01 h-[95px] max-w-[196px] flex-1 cursor-pointer rounded-2xl border border-solid px-[10px] py-[10px] pt-[20px]">
            <div className="text-sub2-sb inline-flex items-center justify-center rounded-2xl bg-white p-[10px] text-black">
              TEXT
            </div>
            <p>글쓰기</p>
          </button>
        </div>
      </section>
      <div className="fixed bottom-0 h-[119px] w-screen max-w-[440px] bg-white px-4 py-[10px]">
        <FullButton>
          <p>다음</p>
        </FullButton>
      </div>
    </main>
  );
};
