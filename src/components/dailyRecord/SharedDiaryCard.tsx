"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import { getSharedDiaryList } from "@/app/api/dailyRecord/sharedDiary.api";

import { DiaryDetail } from "@/types/diary.type";

import { OnlyLoader } from "../common/OnlyLoader";
import { SharedDiaryItem } from "./ShareDiaryItem";

export const SharedDiaryCard = () => {
  const [diaries, setDiaries] = useState<DiaryDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const lastIdRef = useRef<number | undefined>(undefined);
  const hasNextRef = useRef(true);
  const isFetchingRef = useRef(false);

  const loadMoreDiaries = useCallback(async () => {
    if (isFetchingRef.current || !hasNextRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const result = await getSharedDiaryList(10, lastIdRef.current);

      if (!result) {
        return;
      }

      const resData = result;

      if (!resData || !resData.diaries || resData.diaries.length === 0) {
        hasNextRef.current = false;
      } else {
        setDiaries(prev => {
          const existingIds = new Set(prev.map((d: DiaryDetail) => d.diaryId));
          const newDiaries = resData.diaries.filter(
            (d: DiaryDetail) => !existingIds.has(d.diaryId),
          );
          return [...prev, ...newDiaries];
        });

        lastIdRef.current = resData.lastId;
        hasNextRef.current = resData.hasNext;
      }
    } catch (error) {
      console.error("비동기 처리 중 예외 발생:", error);
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  // 초기 로드
  useEffect(() => {
    loadMoreDiaries();
  }, [loadMoreDiaries]);

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 300) {
        loadMoreDiaries();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreDiaries]);

  if (isInitialLoading && diaries.length === 0) {
    return <OnlyLoader />;
  }

  return (
    <div className="flex flex-col gap-4">
      {diaries.map(item => (
        <SharedDiaryItem key={item.diaryId} item={item} />
      ))}
      {isLoading && (
        <div className="flex justify-center py-10">
          <OnlyLoader />
        </div>
      )}
    </div>
  );
};
