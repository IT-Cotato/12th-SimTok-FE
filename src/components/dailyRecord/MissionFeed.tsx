"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import PlusIcon from "@/assets/plus.svg";

import DailyRecordData from "@/mock/dailyRecord.json";

import { MyDayLog } from "@/types/dailyRecord.type";

interface RecordMissionFeedProps {
  myRecord: MyDayLog | null;
}

export const RecordMissionFeed = ({ myRecord }: RecordMissionFeedProps) => {
  const router = useRouter();

  const otherRecords = DailyRecordData.filter(item => !item.isRead).sort(
    (a, b) => {
      if (a.isRead !== b.isRead) {
        return Number(a.isRead) - Number(b.isRead);
      }
      return Date.parse(b.createdAt) - Date.parse(a.createdAt); // 최신순 정렬
    },
  );

  return (
    <div className="scrollbar-hide flex h-[141px] w-full gap-4 overflow-x-auto px-4">
      {/* 내 영역 */}
      <section className="flex">
        <div className="flex w-[88px] shrink-0 cursor-pointer flex-col items-center gap-2">
          {myRecord?.myChallenge ? (
            <Link href={`/day-story/${myRecord.myChallenge.challengeId}`}>
              {myRecord.myChallenge.imageUrl && (
                <Image
                  src={myRecord.myChallenge.imageUrl}
                  alt="내 하루한컷"
                  width={88}
                  height={88}
                  className="h-[88px] w-[88px] rounded-full object-cover"
                />
              )}
            </Link>
          ) : (
            <div
              className="bg-neutral-11 flex h-[88px] w-[88px] items-center justify-center rounded-full"
              onClick={() => router.push("/day-story/upload")}
            >
              <PlusIcon className="text-neutral-05 h-12 w-12" />
            </div>
          )}
          <p className="text-neutral-03 text-d3">나</p>
        </div>
      </section>

      {/* 다른 사람들 */}
      <section className="flex gap-4">
        {otherRecords.map(item => (
          <Link key={item.id} href={`/day-story/${item.id}`}>
            <div className="flex w-[88px] shrink-0 cursor-pointer flex-col items-center gap-2 py-2">
              <Image
                src={item.image}
                alt={item.userName}
                width={88}
                height={88}
                className={`${item.isRead ? "" : "border border-[4px] border-white shadow-[0_0_12px_-1px_#00C362]"} h-[88px] w-[88px] rounded-full object-cover`}
              />
              <p className="text-neutral-03 text-d3">{item.userName}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};
