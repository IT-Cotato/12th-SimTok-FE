"use client";
import Image from "next/image";

import { getEmotionMeta } from "@/utils/getEmotionMeta";

import { BackHeader } from "../common/BackHeader";
import { FullButton } from "../common/FullButton";
import { ProgressDots } from "../common/ProgressDot";
import { UploadTitle } from "./UploadTitle";

interface ConfirmStepProps {
  emotion: string;
  text: string;
  file?: string;
  onSubmit: () => void;
  onBack: () => void;
}
export const ConfirmStep = ({
  emotion,
  file,
  text,
  onSubmit,
  onBack,
}: ConfirmStepProps) => {
  const emotionData = getEmotionMeta(emotion);
  console.log(emotionData, emotion);
  console.log(file);
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
        <FullButton onClick={onSubmit}>
          <p>업로드하기</p>
        </FullButton>
      </div>
    </main>
  );
};
