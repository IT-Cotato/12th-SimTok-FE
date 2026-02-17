"use client";

import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { getDiaryDetail } from "@/app/api/dailyRecord/sharedDiary.api";

import { HeaderWithIcon } from "@/components/common/HeaderWithIcon";
import { OnlyLoader } from "@/components/common/OnlyLoader";
import { SharedDiaryItem } from "@/components/dailyRecord/ShareDiaryItem";

import { DiaryDetail } from "@/types/diary.type";

const SharedDiaryPage = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const router = useRouter();

  const [diary, setDiary] = useState<DiaryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        setIsLoading(true);
        const response = await getDiaryDetail(numericId);
        setDiary(response);
      } catch (error) {
        console.error("일기 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (numericId) fetchDiary();
  }, [numericId]);

  if (isLoading) {
    return <OnlyLoader />;
  }
  if (!diary) {
    return router.push("/day-log");
  }

  return (
    <div className="flex w-full flex-col justify-center">
      <HeaderWithIcon title="공유일기" havePencil={true} />
      <SharedDiaryItem key={diary.diaryId} item={diary} commentMode />
    </div>
  );
};

export default SharedDiaryPage;
