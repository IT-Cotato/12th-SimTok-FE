"use client";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { getChallengeDetail } from "@/app/api/dailyRecord/dayLog.api";

import { BackHeader } from "@/components/common/BackHeader";
import { OnlyLoader } from "@/components/common/OnlyLoader";

import { MissionDetail } from "@/types/dailyRecord.type";

import { getTimeAgo } from "@/utils/getTimeAgo";

const DailyStory = () => {
  const [story, setStory] = useState<MissionDetail>();
  const [loading, setLoading] = useState(false);

  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      try {
        const response = await getChallengeDetail(numericId);
        console.log("챌린지 상세 정보:", response);
        setStory(response);
      } catch (error) {
        console.error("챌린지 상세 정보 로드 실패:", error);
      }
      setLoading(false);
    };
    fetchStory();
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();

  if (loading || !story) {
    return <OnlyLoader />;
  }

  const isMe = searchParams.get("isMe") === "true";
  const timeAgo = getTimeAgo(story.createdAt);

  return (
    <section className="relative h-screen w-full bg-black">
      <div className="fixed top-0 w-full max-w-[440px]">
        <BackHeader
          title={`${isMe ? "나" : story.memberInfo?.nickname}의 챌린지`}
          timeAgo={timeAgo}
          titleColor="neutral-11"
        />
      </div>

      <div className="absolute top-[56px] bottom-[56px] w-full max-w-[440px]">
        <Image
          src={story.imageUrl}
          alt={`${story.memberInfo?.nickname}의 하루한컷`}
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
