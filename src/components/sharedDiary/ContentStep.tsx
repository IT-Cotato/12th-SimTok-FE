"use client";
import Image from "next/image";

import { useEffect, useMemo, useState } from "react";

import CloseIcon from "@/assets/close-bold.svg";

import { Emotion } from "@/types/emotion.type";

import { getEmotionMeta } from "@/utils/getEmotionMeta";

import { BackHeader } from "../common/BackHeader";
import { FullButton } from "../common/FullButton";
import { ProgressDots } from "../common/ProgressDot";
import { WriteStepButton } from "./ContentStepButton";
import { UploadTitle } from "./UploadTitle";

interface ContentStepProps {
  emotion: Emotion;
  defaultContent?: string;
  defaultFile?: File;
  onNext: (text: string, file?: File) => void;
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

  const [file, setFile] = useState<File | undefined>(defaultFile);
  const [text, setText] = useState<string>(defaultContent || "");

  const hasInput = Boolean(text || file);
  const hasText = text.trim().length > 0;
  const hasImage = !!file;

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
      <section className="flex flex-col gap-4">
        {emotionData && (
          <section className="flex flex-col items-center justify-center">
            <Image
              src={emotionData.imageSrc}
              width={hasInput ? 47 : 96}
              height={hasInput ? 47 : 96}
              alt="selected-emotion"
            />
            <p className="text-sub1-sb text-black">
              &ldquo;오늘 하루는 {emotionData.presentText}&rdquo;
            </p>
          </section>
        )}
        <section className="flex flex-col">
          {hasInput && (
            <section>
              {previewUrl && (
                <figure className="relative mx-4">
                  <Image
                    src={previewUrl}
                    alt="업로드 이미지 미리보기"
                    width={440}
                    height={440}
                    className="w-full rounded-2xl object-cover"
                  />
                  <button
                    className="bg-mint-01 absolute top-[6px] right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
                    onClick={() => setFile(undefined)}
                  >
                    <CloseIcon className="h-2 w-2 text-white" />
                  </button>
                </figure>
              )}

              {text && (
                <div className="text-body1-md px-4 py-[15px] break-words whitespace-pre-wrap text-black">
                  {text}
                </div>
              )}
            </section>
          )}
        </section>
      </section>

      <div
        className={`${hasInput ? "pb-[119px]" : "fixed bottom-[119px]"} w-full max-w-[440px]`}
      >
        <WriteStepButton
          onSelectImage={selectedFile => setFile(selectedFile)}
          showInfoMessage={!hasInput}
          text={text}
          onChangeText={setText}
          hasImage={hasImage}
          hasText={hasText}
        />
      </div>
      <div className="border-neutral-09 fixed bottom-0 z-90 h-[119px] w-screen max-w-[440px] bg-white px-4 py-[10px]">
        <FullButton
          isActive={hasInput}
          onClick={() => {
            if (!text) return;
            onNext(text, file || undefined);
          }}
        >
          <p>다음</p>
        </FullButton>
      </div>
    </main>
  );
};
