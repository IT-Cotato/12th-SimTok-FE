"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import CloseIcon from "@/assets/close.svg";

import { MessageInput } from "@/components/common/MessageInput";

import CommentData from "@/mock/diaryComment.json";
import MyProfile from "@/mock/myProfile.json";

interface SharedDiaryCommentProps {
  variant?: "modal" | "page";
}

export const SharedDiaryComment = ({
  variant = "modal",
}: SharedDiaryCommentProps) => {
  const profileImg = MyProfile.profileImg;
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const isPage = variant === "page";
  const [hasComment, setHasComment] = useState(false);

  return (
    <div
      className={`${
        isPage
          ? "min-h-screen"
          : "fixed inset-0 bottom-0 left-1/2 z-50 -translate-x-1/2 bg-black/50"
      } flex w-full max-w-[440px] items-end justify-center`}
    >
      <section
        className={`flex w-full max-w-[440px] flex-col bg-white ${
          isPage ? "h-screen rounded-none" : "h-[545px] rounded-t-2xl"
        }`}
      >
        <div className="h-[433px]">
          <div className="w-full px-4 py-[10px]">
            <button className="h-[14px] w-[14px] cursor-pointer">
              <CloseIcon onClick={() => router.back()} />
            </button>
          </div>
          <h3 className="text-h3 text-neutral-01 border-neutral-10 flex items-center justify-center border-b p-[10px]">
            댓글
          </h3>
          <div className="flex flex-col items-center justify-center pt-[109px]">
            <p className="text-sub1-sb text-neutral-01">아직 댓글이 없습니다</p>
            <p className="text-sub2-r text-neutral-06">댓글을 남겨보세요!</p>
          </div>
        </div>
        <footer className="fixed bottom-0 flex w-full max-w-[440px] items-center gap-[13px] bg-white px-4 pt-4 pb-10 shadow-[0_-2px_10px_0px_rgba(0,0,0,0.10)]">
          <Image
            src={profileImg}
            alt="myProfileImage"
            width={53}
            height={53}
            className="rounded-full object-cover"
          />
          <MessageInput
            onClick={() => router.push(`/shared-diary/${numericId}/comment`)}
          />
        </footer>
      </section>
    </div>
  );
};
