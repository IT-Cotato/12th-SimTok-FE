"use client";
import Image from "next/image";

import { useState } from "react";

import CloseIcon from "@/assets/close-bold.svg";

import { getEmotionMeta } from "@/utils/getEmotionMeta";

import { BackHeader } from "../common/BackHeader";
import { FullButton } from "../common/FullButton";
import { ProgressDots } from "../common/ProgressDot";
import { WriteStepButton } from "./ContentStepButton";
import { UploadTitle } from "./UploadTitle";

interface ContentStepProps {
  emotion: string;
  defaultContent?: string;
  defaultFile?: string;
  onNext: (text: string, file?: string) => void;
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

  const [imageUrl, setImageUrl] = useState<string>(defaultFile || "");
  const [text, setText] = useState<string>(defaultContent || "");

  const hasInput = Boolean(text || imageUrl);
  const hasText = text.trim().length > 0;
  const hasImage = !!imageUrl;

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
      <section className="mb-[255px] flex flex-col gap-4">
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
              {imageUrl && (
                <figure className="relative mx-4">
                  <Image
                    src={imageUrl}
                    alt="업로드 이미지 미리보기"
                    width={440}
                    height={440}
                    className="w-full rounded-2xl object-cover"
                  />
                  <button
                    className="bg-mint-01 absolute top-[6px] right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
                    onClick={() => setImageUrl("")}
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

      <div className="fixed bottom-[119px] w-full max-w-[440px]">
        <WriteStepButton
          onSelectImage={url => setImageUrl(url)}
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
            console.log("Next 버튼 클릭 시 imageUrl 상태:", imageUrl);
            onNext(text, imageUrl);
          }}
        >
          <p>다음</p>
        </FullButton>
      </div>
    </main>
  );
};
