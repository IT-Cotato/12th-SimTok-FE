"use client";
import LeftArrow from "@/assets/left-arrow.svg";

export const RecordMissionCard = () => {
  return (
    <section className="border-mint-01 bg-neutral-11 mx-4 my-[10px] h-[76px] cursor-pointer rounded-2xl border px-[10px]">
      <div className="flex h-full items-center justify-between">
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="flex items-center gap-1">
            <p className="text-sub2-r text-black">하루한컷 미션보러가기</p>
            <LeftArrow className="h-[15px] w-[15px] rotate-180" />
          </div>
          <p className="text-sub1-sb text-black">
            오늘의 챌린지 미션이 도착했어요!
          </p>
        </div>
        <div>
          <p>시작하기</p>
        </div>
      </div>
    </section>
  );
};
