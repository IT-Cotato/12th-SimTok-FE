"use client";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { BackHeader } from "@/components/common/BackHeader";

import DailyRecordData from "@/mock/dailyRecord.json";

import { getTimeAgo } from "@/utils/getTimeAgo";

const DailyStory = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const story = DailyRecordData.find(item => item.id === numericId);
  const router = useRouter();
  const searchParams = useSearchParams();
  if (!story) {
    return router.push("/day-log");
  }
  const isMe = searchParams.get("isMe") === "true";
  const timeAgo = getTimeAgo(story.createdAt);

  return (
    <section className="relative h-screen w-full bg-black">
      <div className="fixed top-0 w-full max-w-[440px]">
        <BackHeader
          title={`${isMe ? "나" : story.userName}의 챌린지`}
          timeAgo={timeAgo}
          titleColor="neutral-11"
        />
      </div>

      <div className="absolute top-[56px] bottom-[56px] w-full max-w-[440px]">
        <Image
          src={story.image}
          alt={`${story.userName}의 하루한컷`}
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* <div className="fixed bottom-0 w-full max-w-[440px]">
        <StoryBottomBar />
      </div> */}
    </section>
  );
};

export default DailyStory;
