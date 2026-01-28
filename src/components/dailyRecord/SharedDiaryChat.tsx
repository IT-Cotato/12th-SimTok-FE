"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import { useEffect } from "react";

import CloseIcon from "@/assets/close.svg";

import { MessageInput } from "@/components/common/MessageInput";

import CommentData from "@/mock/diaryComment.json";
import MyProfile from "@/mock/myProfile.json";

import { CommentList } from "./CommentList";

interface SharedDiaryCommentProps {
  variant?: "modal" | "page";
}

export const SharedDiaryComment = ({
  variant = "modal",
}: SharedDiaryCommentProps) => {
  const isPage = variant === "page";

  const [comments, setComments] = useState(CommentData);

  useEffect(() => {
    if (!isPage) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isPage]);

  const profileImg = MyProfile.profileImg;
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const numericId = id ? Number(id) : null;

  return (
    <div
      className={`${
        isPage
          ? "min-h-screen"
          : "fixed inset-0 bottom-0 left-1/2 z-50 -translate-x-1/2 bg-black/50"
      } flex w-full max-w-[440px] items-end justify-center`}
      onClick={() => {
        if (!isPage) router.back();
      }}
    >
      <section
        className={`flex w-full max-w-[440px] flex-col bg-white ${
          isPage ? "h-screen rounded-none" : "h-[545px] rounded-t-2xl"
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full px-4 py-[10px]">
          <button
            className="h-[14px] w-[14px] cursor-pointer"
            onClick={() => router.back()}
          >
            <CloseIcon />
          </button>
        </div>
        <h3 className="text-h3 text-neutral-01 border-neutral-10 flex items-center justify-center border-b p-[10px]">
          댓글
        </h3>
        <div className="flex-1 overflow-y-auto pb-[109px]">
          <CommentList comments={comments} />
        </div>

        <footer className="fixed bottom-0 flex w-full max-w-[440px] items-center gap-[13px] bg-white px-4 pt-4 pb-10 shadow-[0_-2px_10px_0px_rgba(0,0,0,0.10)]">
          <Image
            src={profileImg}
            alt="myProfileImage"
            width={53}
            height={53}
            className="h-[53px] w-[53px] rounded-full object-cover"
          />
          <MessageInput
            onFocus={() => {
              if (!isPage && numericId !== null) {
                router.push(`/shared-diary/${numericId}/comment`);
              }
            }}
            onSend={message => {
              setComments(prev => [
                ...prev,
                {
                  id: Date.now(), //TODO: mock id
                  userName: MyProfile.userName,
                  profileImg: profileImg,
                  comment: message,
                  createdAt: new Date().toISOString(),
                },
              ]);
            }}
          />
        </footer>
      </section>
    </div>
  );
};
