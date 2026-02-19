"use client";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { getDiaryComments } from "@/app/api/dailyRecord/sharedDiary.api";
import { postDiaryComment } from "@/app/api/dailyRecord/sharedDiary.api";
import { getMyProfile } from "@/app/api/profile/profile.api";

import { MessageInput } from "@/components/common/MessageInput";

import { DiaryComment, DiaryCommentList } from "@/types/diary.type";
import { MyProfile } from "@/types/myProfile.type";

import { OnlyLoader } from "../common/OnlyLoader";
import { CommentList } from "./CommentList";

export const SharedDiaryComment = ({
  diaryId,
  isLiked,
}: {
  diaryId: number;
  isLiked: boolean;
}) => {
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [comments, setComments] = useState<DiaryComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentLastId, setCurrentLastId] = useState<number>(0);

  const router = useRouter();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getMyProfile();
        setProfile(profile);
      } catch (error) {
        console.error("프로필 가져오기 실패:", error);
      }
    };
    fetchProfile();
  }, [diaryId]);

  const profileImg = profile?.profileImageUrl || "";

  const fetchComments = async (isInitial: boolean = false) => {
    if (isLoading || (!isInitial && !hasMore)) return;

    try {
      setIsLoading(true);
      const lastIdToSend = isInitial ? 0 : currentLastId;

      const response: DiaryCommentList = await getDiaryComments(
        diaryId,
        10,
        lastIdToSend,
      );

      if (isInitial) {
        setComments(response.comments);
      } else {
        setComments(prev => [...prev, ...response.comments]);
      }

      setCurrentLastId(response.lastId);
      setHasMore(response.hasNext);
    } catch (error) {
      console.error("댓글 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(true);
  }, [diaryId]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      fetchComments();
    }
  };

  return (
    <div
      className="fixed inset-0 bottom-0 left-1/2 z-50 flex w-full max-w-[440px] -translate-x-1/2 items-end justify-center bg-black/50"
      onClick={() => router.back()}
    >
      <section
        className="flex h-[545px] w-full max-w-[440px] flex-col rounded-t-2xl bg-white"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex w-full items-center justify-center px-4 pt-[10px] pb-9">
          <div className="bg-neutral-08 h-[3px] w-[38px] rounded-[2px]"></div>
        </div>

        <div
          className="flex-1 overflow-y-auto pb-[109px]"
          onScroll={handleScroll}
        >
          <CommentList comments={comments} />
          {isLoading && comments.length > 0 && <OnlyLoader />}
        </div>

        <footer className="fixed bottom-0 flex w-full max-w-[440px] items-center gap-[13px] bg-white px-4 pt-4 pb-[11px]">
          <MessageInput
            diaryId={diaryId}
            isLiked={isLiked}
            onSend={async message => {
              const tempId = Date.now();
              const optimisticComment: DiaryComment = {
                commentId: tempId,
                writerInfo: {
                  memberId: profile?.memberId || 0,
                  nickname: profile?.name || "사용자",
                  profileImageUrl: profileImg,
                  isMe: true,
                },
                content: message,
                createdAt: new Date().toISOString(),
              };

              const previousComments = [...comments];
              setComments(prev => [...prev, optimisticComment]);

              try {
                const serverComment = await postDiaryComment(diaryId, message);

                setComments(prev =>
                  prev.map(comment =>
                    comment.commentId === tempId ? serverComment : comment,
                  ),
                );
              } catch (error) {
                console.error("댓글 등록 실패:", error);
                setComments(previousComments);
              }
            }}
          />
        </footer>
      </section>
    </div>
  );
};
