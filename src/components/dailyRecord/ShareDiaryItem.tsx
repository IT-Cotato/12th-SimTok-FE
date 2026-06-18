"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";

import {
  deleteDiaryLike,
  postDiaryLike,
} from "@/app/api/dailyRecord/sharedDiary.api";

import HeartFillIcon from "@/assets/heart-fill.svg";
import HeartIcon from "@/assets/heart.svg";
import CommentIcon from "@/assets/reply.svg";

import { DiaryDetail } from "@/types/diary.type";

import { getEmotionMeta } from "@/utils/getEmotionMeta";
import { getTimeAgo } from "@/utils/getTimeAgo";

import { ProfileImagePicker } from "../common/ProfileImagePicker";
import { ChatBottomSheet } from "./ChatBottomSheet";

interface SharedDiaryItemProps {
  item: DiaryDetail;
  commentMode?: boolean;
}

export const SharedDiaryItem = ({
  item,
  commentMode = false,
}: SharedDiaryItemProps) => {
  const router = useRouter();
  const [heartClicked, setHeartClicked] = useState(item.isLiked);

  const emotionMeta = getEmotionMeta(item.emojiCode);
  const timeAgo = getTimeAgo(item.createdAt);

  const handleHeartClick = async () => {
    const previousState = heartClicked;
    setHeartClicked(!previousState);
    try {
      const apiCall = heartClicked ? deleteDiaryLike : postDiaryLike;
      await apiCall(item.diaryId);
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      setHeartClicked(previousState);
    }
  };

  return (
    <section key={item.diaryId} className="mb-6 flex w-full flex-col">
      <div className="flex items-center justify-between px-4 py-[10px]">
        <div className="flex items-center justify-start gap-[5px]">
          <ProfileImagePicker
            imageUrl={item.writerInfo.profileImageUrl}
            canEdit={false}
            width={46}
            height={46}
            radius={16}
          />
          <p className="text-sub1-sb text-neutral-01">
            {item.writerInfo.nickname}
          </p>
        </div>
        <p className="text-neutral-04 text-sub2-sb">{timeAgo}</p>
      </div>

      <section className="flex flex-col gap-4">
        {emotionMeta && (
          <figure className="-mt-[32px] flex flex-col items-center">
            <div className="p-[10px]">
              <Image
                src={emotionMeta.imageSrc}
                alt={item.emojiCode}
                width={89}
                height={89}
              />
            </div>
            <figcaption className="text-sub1-sb text-black">
              {`"오늘 하루는 ${emotionMeta.pastText}"`}
            </figcaption>
          </figure>
        )}
        {item.imageUrl && (
          <div className="w-full px-4">
            <Image
              src={item.imageUrl}
              alt="diary image"
              width={800}
              height={600}
              className="h-auto w-full rounded-2xl object-contain"
            />
          </div>
        )}

        {!item.imageUrl && (
          <section className="px-4">
            <div className="bg-neutral-10 border-mint-01 rounded-2xl border px-[10px] py-4">
              {item.content}
            </div>
          </section>
        )}
      </section>

      <div
        className={`flex p-[10px] px-4 ${item.imageUrl ? "justify-between" : "self-end"}`}
      >
        {item.imageUrl && (
          <p className="text-body1-md text-black">{item.content}</p>
        )}

        <div className="flex items-start justify-start">
          <div className="flex gap-3 pl-[10px]">
            <div className="cursor-pointer" onClick={handleHeartClick}>
              {heartClicked ? (
                <HeartFillIcon
                  width={26}
                  height={26}
                  className="text-mint-01"
                />
              ) : (
                <HeartIcon width={26} height={26} className="text-neutral-01" />
              )}
            </div>
            <CommentIcon
              className="text-neutral-01 h-[26px] w-[26px] cursor-pointer"
              onClick={() => router.push(`/shared-diary/${item.diaryId}`)}
            />
          </div>
        </div>
      </div>
      {commentMode && (
        <div className="w-full">
          <ChatBottomSheet
            type="diary"
            targetId={item.diaryId}
            isLiked={item.isLiked}
            onHeartClick={handleHeartClick}
          />
        </div>
      )}
    </section>
  );
};
