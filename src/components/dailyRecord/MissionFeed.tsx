"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useRef, useState } from "react";

import { getFriendsDayLog } from "@/app/api/dailyRecord/dayLog.api";

import PlusIcon from "@/assets/plus.svg";

import {
  MissionFeedItem,
  MissionFeedResponse,
  MyDayLog,
} from "@/types/dailyRecord.type";

interface RecordMissionFeedProps {
  myRecord: MyDayLog | null;
}

export const RecordMissionFeed = ({ myRecord }: RecordMissionFeedProps) => {
  const router = useRouter();

  const [otherRecords, setOtherRecords] = useState<MissionFeedItem[]>([]);
  const [lastId, setLastId] = useState<number | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const observerRef = useRef<HTMLDivElement>(null);

  const fetchRecords = useCallback(
    async (currentLastId?: number) => {
      if (isLoading || !hasNextPage) return;

      setIsLoading(true);
      try {
        const response: MissionFeedResponse = await getFriendsDayLog(
          10,
          currentLastId,
        );

        const newChallenges = response.challenges || [];

        setHasNextPage(response.hasNext);

        if (newChallenges.length > 0) {
          setOtherRecords(prev => {
            const existingIds = new Set(prev.map(item => item.challengeId));
            const filtered = newChallenges.filter(
              item => !existingIds.has(item.challengeId),
            );
            return [...prev, ...filtered];
          });
          setLastId(response.lastId);
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        setHasNextPage(false);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, hasNextPage],
  );
  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && !isLoading) {
          fetchRecords(lastId);
        }
      },
      { threshold: 0.1, rootMargin: "0px 100px 0px 0px" },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [lastId, hasNextPage, isLoading, fetchRecords]);

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
          {myRecord?.isCompleted ? (
            <Link href={`/day-story/${myRecord.challengeId}?isMe=true`}>
              <div className="h-[88px] w-[88px] overflow-hidden rounded-full">
                <Image
                  src={myRecord.imageUrl}
                  alt="내 하루한컷"
                  width={88}
                  height={88}
                  className="h-full w-full object-cover"
                />
              </div>
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
              <div
                className={`h-[88px] w-[88px] overflow-hidden rounded-full ${
                  item.isViewed
                    ? ""
                    : "border-[4px] border-white shadow-[0_0_12px_-1px_#00C362]"
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.memberInfo?.nickname || "사용자"}
                  width={88}
                  height={88}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-neutral-03 text-d3 w-full truncate text-center">
                {item.memberInfo?.nickname}
              </p>
            </div>
          </Link>
        ))}
        <div ref={observerRef} className="h-full w-1 shrink-0" />
      </section>
    </div>
  );
};
