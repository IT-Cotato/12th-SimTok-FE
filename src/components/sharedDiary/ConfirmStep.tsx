"use client";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";

import { Emotion } from "@/types/emotion.type";

import { formatDateWithDot } from "@/utils/formatDate";
import { getEmotionMeta } from "@/utils/getEmotionMeta";

import { BackHeader } from "../common/BackHeader";
import { FullButton } from "../common/FullButton";
import { ProgressDots } from "../common/ProgressDot";
import { UploadTitle } from "./UploadTitle";

interface ConfirmStep {
  emotion: Emotion;
  text: string;
  file: File;
  onSubmit: () => void;
  onBack: () => void;
}
export const ConfirmStep = ({
  emotion,
  file,
  text,
  onSubmit,
  onBack,
}: ConfirmStep) => {
  const emotionData = getEmotionMeta(emotion);

  const previewUrlRef = useRef<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;

    // 비동기로 state 업데이트
    const id = setTimeout(() => setPreviewUrl(url), 0);

    return () => {
      clearTimeout(id);
      URL.revokeObjectURL(url);
      previewUrlRef.current = null;
    };
  }, [file]);

  return (
    <main className="w-full">
      <BackHeader title="공유일기쓰기" />
      <div className="mt-[1px]">
        <ProgressDots total={3} current={3} />
      </div>
      <div className="mt-[13px]">
        <UploadTitle
          title="공유일기 작성을 완료할까요?"
          subTitle="완료하고나면 친구들과 공유돼요."
        />
      </div>
      {emotionData && (
        <section className="flex flex-col items-center justify-center gap-[6px]">
          <Image
            src={emotionData.imageSrc}
            width={64}
            height={64}
            alt="selected-emotion"
            className="h-16 w-16"
          />
          <p className="text-sub1-r text-black">
            &ldquo;오늘 하루는 {emotionData.presentText}&rdquo;
          </p>
        </section>
      )}
      {(previewUrl || text) && (
        <section className="mt-[6px] flex flex-col gap-[15px] pb-[158px]">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="업로드 이미지 미리보기"
              className="h-auto w-full"
            />
          )}
          <div className="flex justify-between px-4">
            <div className="text-sub1-r whitespace-pre-wrap text-black">
              {text}
            </div>
            <div className="text-neutral-07 text-sub1-r">
              {formatDateWithDot(new Date().toISOString())}
            </div>
          </div>
        </section>
      )}
      <div className="fixed bottom-0 h-[119px] w-screen max-w-[440px] bg-white px-4 py-[10px]">
        <FullButton onClick={onSubmit}>
          <p>업로드하기</p>
        </FullButton>
      </div>
    </main>
  );
};
