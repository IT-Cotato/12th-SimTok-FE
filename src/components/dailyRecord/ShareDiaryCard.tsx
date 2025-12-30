"use client";
import Image from "next/image";

import { useState } from "react";

import HeartFillIcon from "@/assets/heart-fill.svg";
import HeartIcon from "@/assets/heart.svg";
import CommentIcon from "@/assets/reply.svg";

import ShareDiaryData from "@/mock/sharedDiary.json";

import { getEmotionMeta } from "@/utils/getEmotionMeta";
import { getTimeAgo } from "@/utils/getTimeAgo";

export const SharedDiaryCard = () => {
  const [heartClicked, setHeartClicked] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {ShareDiaryData.map(item => {
        const emotionMeta = getEmotionMeta(item.emotion);
        const timeAgo = getTimeAgo(item.createdAt);
        return (
          <section key={item.id} className="flex flex-col">
            <div className="flex items-center justify-start gap-[5px] px-4 py-[10px]">
              <Image
                src={item.profile}
                alt={item.userName}
                width={46}
                height={46}
                className="rounded-full object-cover"
              />
              <p>{item.userName}</p>
            </div>
            {emotionMeta && (
              <h3 className="-mt-[32px] flex flex-col items-center">
                <Image
                  src={emotionMeta.imageSrc}
                  alt={item.emotion}
                  width={89}
                  height={89}
                  className="p-[10px]"
                />
                <p className="text-sub1-sb -mt-[16px] text-black">
                  {`"오늘 하루는 ${emotionMeta.pastText}"`}
                </p>
              </h3>
            )}
            <div className="bg-neutral-11 relative mt-2 h-[589px] w-full">
              <Image
                src={item.image}
                alt={item.image}
                fill
                className="w-full object-contain"
              />
            </div>

            <div className="flex flex-col gap-[10px] px-4 pt-[10px] pb-4">
              <p className="text-body1-md text-black">{item.text}</p>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <div
                    className="cursor-pointer"
                    onClick={() => setHeartClicked(prev => !prev)}
                  >
                    {heartClicked ? <HeartFillIcon /> : <HeartIcon />}
                  </div>
                  <CommentIcon className="cursor-pointer" />
                </div>
                <p className="text-neutral-04 text-sub2-sb">{timeAgo}</p>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
