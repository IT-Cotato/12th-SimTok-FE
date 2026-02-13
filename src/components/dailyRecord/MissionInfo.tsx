"use client";
import { useRouter } from "next/navigation";

import RightArrow from "@/assets/left-arrow.svg";

interface RecordMissionInfoProps {
  hasMyRecord: boolean;
}
export const RecordMissionInfo = ({ hasMyRecord }: RecordMissionInfoProps) => {
  const router = useRouter();
  return (
    <section
      className={`${hasMyRecord ? "border-mint-01" : "border-orange-00"} bg-neutral-11 mx-4 mt-[13.5px] rounded-2xl border`}
    >
      {hasMyRecord ? (
        <button
          className="flex h-[76px] w-full cursor-pointer flex-col items-center justify-center p-[10px]"
          onClick={() => router.push("/day-story/upload")}
        >
          <div className="flex items-center">
            <p className="text-neutral-03 text-body1-md">하루한컷</p>
            <RightArrow className="h-[15px] w-[15px] -rotate-180" />
          </div>

          <p className="text-sub1-sb text-neutral-01">
            👏오늘의 챌린지 미션을 완료했어요👏
          </p>
        </button>
      ) : (
        <button
          className="flex h-[76px] w-full cursor-pointer flex-col items-center justify-center gap-[2px] p-[10px]"
          onClick={() => router.push("/day-story/upload")}
        >
          <div className="flex items-center">
            <p className="text-neutral-03 text-body1-md">하루한컷</p>
            <RightArrow className="h-[15px] w-[15px] -rotate-180" />
          </div>

          <p className="text-sub1-sb text-orange-00">
            🔥오늘의 챌린지 미션이 도착했어요🔥
          </p>
        </button>
      )}
    </section>
  );
};
