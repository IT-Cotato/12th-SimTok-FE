"use client";

import { useParams } from "next/navigation";

import { Header } from "@/components/dailyRecord/Header";
import { SharedDiaryItem } from "@/components/dailyRecord/ShareDiaryItem";

import SharedDiaryData from "@/mock/sharedDiary.json";

import { Diary } from "@/types/diary.type";

const SharedDiaryPage = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const SharedDiary = SharedDiaryData as Diary[];
  const diaryData = SharedDiary.find(item => item.id === numericId);

  if (!diaryData) {
    return <div>일기를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex w-full flex-col justify-center">
      <Header />
      <SharedDiaryItem key={diaryData.id} item={diaryData} commentMode />
    </div>
  );
};

export default SharedDiaryPage;
