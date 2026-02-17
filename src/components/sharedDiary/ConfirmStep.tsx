"use client";
import Image from "next/image";

import { useState } from "react";

import { postSharedDiary } from "@/app/api/dailyRecord/sharedDiary.api";

import { getEmotionMeta } from "@/utils/getEmotionMeta";

import { BackHeader } from "../common/BackHeader";
import { FullButton } from "../common/FullButton";
import { OnlyLoader } from "../common/OnlyLoader";
import { ProgressDots } from "../common/ProgressDot";
import { UploadTitle } from "./UploadTitle";

interface ConfirmStepProps {
  date: string;
  emotion: string;
  text: string;
  file?: string;
  onSubmit: () => void;
  onBack: () => void;
}
export const ConfirmStep = ({
  date,
  emotion,
  file,
  text,
  onSubmit,
  onBack,
}: ConfirmStepProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const emotionData = getEmotionMeta(emotion);

  const handleUpload = async () => {
    if (isLoading) return; // 이미 로딩 중이면 중복 실행 방지

    try {
      setIsLoading(true);
      await postSharedDiary(
        date, // 서버로 보낼 날짜 (YYYY-MM-DD 형식 권장)
        emotion, // emojiCode
        text || undefined, // content
        file || undefined, // imageUrl
      );
      onSubmit();
    } catch (error) {
      alert("일기 저장에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };
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
          titleColor="text-green-01"
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
          <p className="text-sub1-sb text-black">
            &ldquo;오늘 하루는 {emotionData.presentText}&rdquo;
          </p>
        </section>
      )}
      {(file || text) && (
        <section className="mt-[6px] flex flex-col gap-[15px] pb-[158px]">
          {file && (
            <div className="px-4">
              <Image
                src={file}
                alt="업로드 이미지 확인"
                width={440}
                height={440}
                className="h-auto w-full rounded-2xl object-cover"
              />
            </div>
          )}

          <div className="text-body1-md px-4 break-all whitespace-pre-wrap text-black">
            {text}
          </div>
        </section>
      )}
      <div className="fixed bottom-0 h-[119px] w-screen max-w-[440px] bg-white px-4 py-[10px]">
        <FullButton onClick={handleUpload} disabled={isLoading}>
          <p>업로드하기</p>
        </FullButton>
      </div>
      {isLoading && <OnlyLoader />}
    </main>
  );
};
