"use client";
import LeftArrow from "@/assets/left-arrow.svg";

export const RecordMissionCard = () => {
  return (
    <section className="border-mint-01 bg-neutral-11 mx-4 mt-[13.5px] cursor-pointer rounded-2xl border">
      <div className="flex h-[76px] items-center justify-between p-[10px]">
        <p className="text-sub1-sb text-black">
          오늘의 챌린지 미션이 도착했어요!
        </p>
        <div className="flex h-full flex-col justify-end">
          <p className="text-green-01 text-sub2-r px-[6px]">시작하기</p>
        </div>
      </div>
    </section>
  );
};
