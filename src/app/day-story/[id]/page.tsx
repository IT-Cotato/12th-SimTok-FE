"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import { BackHeader } from "@/components/common/BackHeader";

import DailyRecordData from "@/mock/dailyRecord.json";

import { getTimeAgo } from "@/utils/getTimeAgo";

const DailyStory = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const story = DailyRecordData.find(item => item.id === numericId);

  if (!story) {
    return <div>스토리를 찾을 수 없습니다.</div>;
  }

  const timeAgo = getTimeAgo(story.createdAt);

  return (
    <section className="w-full">
      <BackHeader title={`${story.userName}의 하루`} timeAgo={timeAgo} />

      <div className="relative mt-4 h-[calc(100vh-64px)] w-full">
        <Image
          src={story.image}
          alt={`${story.userName}의 하루한컷`}
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
};

export default DailyStory;
