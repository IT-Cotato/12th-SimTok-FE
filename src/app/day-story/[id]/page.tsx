"use client";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import {
  deleteChallengeLike,
  postChallengeLike,
} from "@/app/api/dailyRecord/dayLog.api";
import { getChallengeDetail } from "@/app/api/dailyRecord/dayLog.api";

import { BackHeader } from "@/components/common/BackHeader";
import { MessageInput } from "@/components/common/MessageInput";
import { OnlyLoader } from "@/components/common/OnlyLoader";
import { ChatBottomSheet } from "@/components/dailyRecord/ChatBottomSheet";

import { MissionDetail } from "@/types/dailyRecord.type";

import { getTimeAgo } from "@/utils/getTimeAgo";

const DailyStory = () => {
  const [story, setStory] = useState<MissionDetail>();
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const handleHeartClick = async () => {
    const previousState = isLiked;
    setIsLiked(!previousState);
    try {
      const apiCall = isLiked ? deleteChallengeLike : postChallengeLike;
      await apiCall(numericId);
    } catch (error) {
      console.error("좋아요 처리 실패", error);
      setIsLiked(previousState);
    }
  };

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      try {
        const response = await getChallengeDetail(numericId);

        setStory(response);
        setIsLiked(response.isLiked);
      } catch (error) {
        console.error("챌린지 상세 정보 로드 실패:", error);
      }
      setLoading(false);
    };
    fetchStory();
  }, []);

  const searchParams = useSearchParams();

  if (loading || !story) {
    return <OnlyLoader />;
  }

  const isMe = searchParams.get("isMe") === "true";
  const timeAgo = getTimeAgo(story.createdAt);

  return (
    <section className="relative h-screen w-full bg-black">
      <div className="fixed top-0 z-10 w-full max-w-[440px]">
        <BackHeader
          title={`${isMe ? "나" : story.memberInfo?.nickname}의 챌린지`}
          timeAgo={timeAgo}
          titleColor="neutral-11"
        />
      </div>

      <div className="absolute top-[56px] right-0 bottom-[80px] left-0 flex items-center justify-center">
        <Image
          src={story.imageUrl}
          alt={`${story.memberInfo?.nickname}의 하루한컷`}
          width={440}
          height={600}
          className="h-auto w-full rounded-xl object-contain"
          priority
        />
      </div>

      {/* 클릭시 바텀시트 열리기 */}
      <div className="fixed bottom-0 z-10 my-[15px] w-full max-w-[440px] px-4">
        {chatOpen ? (
          <ChatBottomSheet
            type="challenge"
            targetId={numericId}
            onHeartClick={handleHeartClick}
            isLiked={isLiked}
          />
        ) : (
          <MessageInput
            type="challenge"
            targetId={numericId}
            onInputClick={() => setChatOpen(true)}
            onHeartClick={handleHeartClick}
            isLiked={isLiked}
            readOnly
          />
        )}
      </div>
    </section>
  );
};

export default DailyStory;
