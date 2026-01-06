"use client";
import CheckIcon from "@/assets/check.svg";

interface RecordMissionInfoProps {
  hasMyRecord: boolean;
}
export const RecordMissionInfo = ({ hasMyRecord }: RecordMissionInfoProps) => {
  return (
    <section className="border-mint-01 bg-neutral-11 mx-4 mt-[13.5px] cursor-pointer rounded-2xl border">
      <div className="flex h-[76px] items-center justify-between p-[10px]">
        {hasMyRecord ? (
          <>
            <p className="text-sub1-sb text-neutral-07">
              오늘의 챌린지 미션을 완료했어요.
            </p>
            <div className="flex flex-col">
              <CheckIcon />
              <p className="text-sub2-r text-neutral-06 -mt-[4px] px-[6px]">
                미션완료
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="text-sub1-sb text-black">
              오늘의 챌린지 미션이 도착했어요!
            </p>
            <div className="flex h-full flex-col justify-end">
              <p className="text-green-01 text-sub2-r px-[6px]">시작하기</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
