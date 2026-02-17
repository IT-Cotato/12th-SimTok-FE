"use client";
import { useCallback, useEffect, useState } from "react";

import { getSharedDiaryList } from "@/app/api/dailyRecord/sharedDiary.api";

import { DiaryDetail } from "@/types/diary.type";

import { OnlyLoader } from "../common/OnlyLoader";
import { SharedDiaryItem } from "./ShareDiaryItem";

export const SharedDiaryCard = () => {
  const [diaries, setDiaries] = useState<DiaryDetail[]>([]);
  const [lastId, setLastId] = useState<number | undefined>(undefined);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const loadMoreDiaries = useCallback(async () => {
    if (isLoading || !hasNext) return;
    setIsLoading(true);

    try {
      const result = await getSharedDiaryList(5, lastId);

      if (!result.diaries || result.diaries.length === 0) {
        setHasNext(false);
      } else {
        setDiaries(prev => [...prev, ...result.diaries]);
        setLastId(result.lastId);
        setHasNext(result.hasNext);
      }
    } catch (error) {
      console.error("데이터 로드 에러:", error);
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  }, [lastId, hasNext, isLoading]);

  // 3. 첫 진입 시 데이터 호출
  useEffect(() => {
    loadMoreDiaries();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMoreDiaries();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreDiaries]);

  // 첫 데이터 로딩 중에만 전체 화면 로더 표시
  if (isInitialLoading && diaries.length === 0) {
    return <OnlyLoader />;
  }

  return (
    <div className="flex flex-col gap-4">
      {diaries.map(item => (
        <SharedDiaryItem key={item.diaryId} item={item} />
      ))}
    </div>
  );
};
