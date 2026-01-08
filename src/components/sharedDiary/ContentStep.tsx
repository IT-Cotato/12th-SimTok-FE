"use client";
import Image from "next/image";

import { useEffect, useMemo, useState } from "react";

import { Emotion } from "@/types/emotion.type";

import { getEmotionMeta } from "@/utils/getEmotionMeta";

import { BackHeader } from "../common/BackHeader";
import { FullButton } from "../common/FullButton";
import ProgressDots from "../common/ProgressDot";
import { WriteStepButton } from "./ContentStepButton";
import { UploadTitle } from "./UploadTitle";

interface ContentStepProps {
  emotion: Emotion;
  defaultContent?: string;
  defaultFile?: File;
  onNext: (content: string, file: File) => void;
  onBack: () => void;
}
export const ContentStep = ({
  emotion,
  defaultContent,
  defaultFile,
  onNext,
  onBack,
}: ContentStepProps) => {
  const emotionData = getEmotionMeta(emotion);

  const [file, setFile] = useState<File | null>(defaultFile ?? null);
  const [text, setText] = useState<string>("");

  const hasInput = Boolean(text || file);
  const canGoNext = Boolean(text && file);

  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  console.log(text);

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

      {(previewUrl || text) && (
        <section className="pb-[254px]">
          {previewUrl && (
            <Image
              src={previewUrl}
              alt="업로드 이미지 미리보기"
              width={440}
              height={440}
              className="w-full"
            />
          )}

          {text && (
            <div className="text-sub1-r px-4 py-[15px] whitespace-pre-wrap text-black">
              {text}
            </div>
          )}
        </section>
      )}

      <div className="fixed bottom-[119px] z-99 w-full max-w-[440px]">
        <WriteStepButton
          onSelectImage={selectedFile => setFile(selectedFile)}
          showInfoMessage={!hasInput}
          text={text}
          onChangeText={setText}
        />
      </div>
      <div className="fixed bottom-0 h-[119px] w-screen max-w-[440px] bg-white px-4 py-[10px]">
        <FullButton
          isActive={canGoNext}
          onClick={() => {
            if (!file) return;
            onNext(text, file);
          }}
        >
          <p>다음</p>
        </FullButton>
      </div>
    </main>
  );
};
