"use client";

import { useParams } from "next/navigation";

import { HeaderWithIcon } from "@/components/common/HeaderWithIcon";
import { SharedDiaryItem } from "@/components/dailyRecord/ShareDiaryItem";

import SharedDiaryData from "@/mock/sharedDiary.json";

import { Diary } from "@/types/diary.type";

const SharedDiaryPage = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const sharedDiary = SharedDiaryData as Diary[];
  const diaryData = sharedDiary.find(item => item.id === numericId);

  if (!diaryData) {
    return <div>일기를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex w-full flex-col justify-center">
      <HeaderWithIcon title="공유일기" havePencil={true} />
      <SharedDiaryItem key={diaryData.id} item={diaryData} commentMode />
    </div>
  );
};

export default SharedDiaryPage;
