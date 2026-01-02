"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import { BackHeader } from "@/components/common/BackHeader";
import { StoryBottomBar } from "@/components/dailyRecord/StoryBottomBar";

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
    <section className="relative flex h-screen w-full items-center">
      <div className="fixed top-0 w-full max-w-[440px]">
        <BackHeader title={`${story.userName}의 하루`} timeAgo={timeAgo} />
      </div>

      <div className="absolute top-[66px] bottom-[114px] w-full max-w-[440px]">
        <Image
          src={story.image}
          alt={`${story.userName}의 하루한컷`}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="fixed bottom-0 w-full max-w-[440px]">
        <StoryBottomBar />
      </div>
    </section>
  );
};

export default DailyStory;
