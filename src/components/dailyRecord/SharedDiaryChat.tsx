"use client";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { getDiaryComments } from "@/app/api/dailyRecord/route";

import { MessageInput } from "@/components/common/MessageInput";

import MyProfile from "@/mock/myProfile.json";

import { DiaryComment, DiaryCommentList } from "@/types/diary.type";

import { OnlyLoader } from "../common/OnlyLoader";
import { CommentList } from "./CommentList";

export const SharedDiaryComment = ({ diaryId }: { diaryId: number }) => {
  // 1. 상태를 배열(DiaryComment[])로 관리하도록 수정
  const [comments, setComments] = useState<DiaryComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentLastId, setCurrentLastId] = useState<number>(0);

  const router = useRouter();
  const profileImg = MyProfile.profileImg;

  const fetchComments = async (isInitial: boolean = false) => {
    if (isLoading || (!isInitial && !hasMore)) return;

    try {
      setIsLoading(true);
      const lastIdToSend = isInitial ? 0 : currentLastId;

      // 사이즈는 무조건 10으로 고정
      const response: DiaryCommentList = await getDiaryComments(
        diaryId,
        10,
        lastIdToSend,
      );

      // 3. 데이터 업데이트 (배열에 추가)
      if (isInitial) {
        setComments(response.comments);
      } else {
        setComments(prev => [...prev, ...response.comments]);
      }

      // 4. 페이징 정보 갱신
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
  console.log(comments);
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

        {/* 스크롤 이벤트 연결 */}
        <div
          className="flex-1 overflow-y-auto pb-[109px]"
          onScroll={handleScroll}
        >
          <CommentList comments={comments} />
          {isLoading && comments.length > 0 && <OnlyLoader />}
        </div>

        <footer className="fixed bottom-0 flex w-full max-w-[440px] items-center gap-[13px] bg-white px-4 pt-4 pb-[11px]">
          <MessageInput
            onSend={message => {
              const newComment: DiaryComment = {
                commentId: Date.now(),
                writerInfo: {
                  memberId: 0,
                  nickname: MyProfile.userName,
                  profileImageUrl: profileImg,
                  isMe: true,
                },
                content: message,
                createdAt: new Date().toISOString(),
              };
              // 새 댓글을 리스트 가장 상단에 추가
              setComments(prev => [newComment, ...prev]);
            }}
          />
        </footer>
      </section>
    </div>
  );
};
