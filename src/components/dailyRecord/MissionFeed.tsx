"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { getFriendsDayLog } from "@/app/api/dailyRecord/dayLog.api";

import PlusIcon from "@/assets/plus.svg";

import { MissionFeedList, MyDayLog } from "@/types/dailyRecord.type";

interface RecordMissionFeedProps {
  myRecord: MyDayLog | null;
}

export const RecordMissionFeed = ({ myRecord }: RecordMissionFeedProps) => {
  const router = useRouter();

  const [otherRecords, setOtherRecords] = useState<MissionFeedList[]>([]);
  const [lastId, setLastId] = useState<number | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const observerRef = useRef<HTMLDivElement>(null);

  // 1. 데이터 호출 함수
  const fetchRecords = async (currentLastId?: number) => {
    if (isLoading || !hasNextPage) return;
    setIsLoading(true);
    try {
      const size = 10;
      const data = await getFriendsDayLog(size, currentLastId);

      if (data.length < size) {
        setHasNextPage(false);
      }

      if (data.length > 0) {
        setOtherRecords(prev => [...prev, ...data]);
        setLastId(data[data.length - 1].id);
      }
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Intersection Observer 설정 (useEffect로 감싸기)
  useEffect(() => {
    // 관찰 대상이 없거나 다음 페이지가 없으면 생성 안 함
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        // 타입을 명시적으로 지정
        if (entries[0].isIntersecting && !isLoading) {
          fetchRecords(lastId);
        }
      },
      { threshold: 0.1, rootMargin: "0px 100px 0px 0px" },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
    // 의존성 배열의 변수들이 boolean/number/undefined임을 위에서 useState로 명시했으므로 에러가 사라집니다.
  }, [lastId, hasNextPage, isLoading]);

  const sortedRecords = [...otherRecords].sort((a, b) => {
    if (a.isViewed !== b.isViewed)
      return Number(a.isViewed) - Number(b.isViewed);
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });

  return (
    <div className="scrollbar-hide flex h-[141px] w-full gap-4 overflow-x-auto px-4">
      {/* 내 영역 */}
      <section className="flex">
        <div className="flex w-[88px] shrink-0 cursor-pointer flex-col items-center gap-2">
          {myRecord?.isCompleted === true ? (
            <Link href={`/day-story/${myRecord.challengeId}?isMe=true`}>
              {myRecord.imageUrl && (
                <Image
                  src={myRecord.imageUrl}
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
        {sortedRecords.map(item => (
          <Link key={item.challengeId} href={`/day-story/${item.challengeId}`}>
            <div className="flex w-[88px] shrink-0 cursor-pointer flex-col items-center gap-2 py-2">
              <Image
                src={item.imageUrl}
                alt={item.memberInfo?.nickname || "사용자"}
                width={88}
                height={88}
                className={`${item.isViewed ? "" : "border border-[4px] border-white shadow-[0_0_12px_-1px_#00C362]"} h-[88px] w-[88px] rounded-full object-cover`}
              />
              <p className="text-neutral-03 text-d3">
                {item.memberInfo?.nickname}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};
