"use client";
import Image from "next/image";
import Link from "next/link";

import PlusIcon from "@/assets/plus.svg";

import DailyRecordData from "@/mock/dailyRecord.json";

export const RecordMissionFeed = () => {
  const MY_ID = 101;

  const myRecord = DailyRecordData.find(item => item.userId === MY_ID);

  // TODO: api연결시, zustand로 optimistic update로직 추가
  const otherRecords = DailyRecordData.filter(
    item => item.userId !== MY_ID,
  ).sort((a, b) => {
    if (a.isRead !== b.isRead) {
      return Number(a.isRead) - Number(b.isRead);
    }
    return Date.parse(b.createdAt) - Date.parse(a.createdAt); // 최신순 정렬
  });

  return (
    <div className="scrollbar-hide flex h-[141px] w-full gap-4 overflow-x-auto px-4">
      {/* 내 영역 */}
      <section className="flex">
        <div className="flex w-[88px] shrink-0 cursor-pointer flex-col items-center gap-2">
          {myRecord ? (
            <Link href={`/day-story/${myRecord.id}`}>
              <Image
                src={myRecord.image}
                alt="내 하루한컷"
                width={88}
                height={88}
                className="h-[88px] w-[88px] rounded-full object-cover"
              />
            </Link>
          ) : (
            <div className="bg-neutral-11 flex h-[88px] w-[88px] items-center justify-center rounded-full">
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
            <div className="flex w-[88px] shrink-0 cursor-pointer flex-col items-center gap-2 py-1">
              <Image
                src={item.image}
                alt={item.userName}
                width={88}
                height={88}
                className={`${item.isRead ? "" : "border-green-03 border border-[4px] shadow-[0_0_6px_-1px_rgba(0,168,85,0.50)]"} h-[88px] w-[88px] rounded-full object-cover`}
              />
              <p className="text-neutral-03 text-d3">{item.userName}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};
