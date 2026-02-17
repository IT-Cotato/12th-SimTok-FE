import Image from "next/image";

import { DiaryComment } from "@/types/diary.type";

import { formatDate } from "@/utils/formatDate";

import { ProfileImagePicker } from "../common/ProfileImagePicker";

interface CommentListProps {
  comments: DiaryComment[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-5">
        <p className="text-d3 text-neutral-06">아직 댓글이 없습니다</p>
        <p className="text-sub1-r text-neutral-06">댓글을 남겨보세요!</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col">
      {comments.map(comment => (
        <li key={comment.commentId} className="flex gap-[10px] px-4 py-[10px]">
          <ProfileImagePicker
            imageUrl={comment.writerInfo.profileImageUrl}
            width={56}
            height={56}
            radius={16}
            canEdit={false}
          />
          <div className="flex flex-1 justify-between">
            <div className="flex flex-col gap-[1px]">
              <p className="text-d3 text-neutral-01">
                {comment.writerInfo.nickname}
              </p>
              <p className="text-sub1-r text-neutral-01">{comment.content}</p>
            </div>
            <p className="text-body3 text-neutral-05 flex shrink-0 flex-col self-start">
              {formatDate(comment.createdAt)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
