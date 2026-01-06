import Image from "next/image";

import { DiaryComment } from "@/types/diaryComment.type";

import { formatDate } from "@/utils/formatDate";

interface CommentListProps {
  comments: DiaryComment[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-[109px]">
        <p className="text-sub1-sb text-neutral-01">아직 댓글이 없습니다</p>
        <p className="text-sub2-r text-neutral-06">댓글을 남겨보세요!</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col">
      {comments.map(comment => (
        <li key={comment.id} className="flex gap-[10px] px-4 py-[10px]">
          <Image
            src={comment.profileImg}
            alt={comment.userName}
            width={56}
            height={56}
            className="rounded-2xl object-cover"
          />
          <div className="flex flex-1 justify-between">
            <div className="flex flex-col">
              <p className="text-d3 text-black">{comment.userName}</p>
              <p className="text-sub1-r text-neutral-05">{comment.comment}</p>
            </div>
            <p className="text-body3 text-neutral-05 flex flex-col self-start">
              {formatDate(comment.createdAt)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
