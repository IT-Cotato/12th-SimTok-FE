interface FriendMessageProps {
  userName: string;
  profileImage?: string;
  content: string;
  time: string;
}

export const FriendMessage = ({
  userName,
  profileImage,
  content,
  time,
}: FriendMessageProps) => {
  return (
    <div className="flex w-full justify-start gap-[6px] px-4 py-[10px]">
      <div className="bg-neutral-08 h-12 w-12 overflow-hidden rounded-2xl">
        {profileImage && (
          <img
            src={profileImage}
            alt={userName}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sub2-r text-neutral-05">{userName}</span>
        <div className="flex items-end gap-1">
          <div className="bg-neutral-11 max-w-[240px] rounded-2xl px-4 py-[10px]">
            <p className="text-sub1-r text-neutral-01 break-all">{content}</p>
          </div>
          <span className="text-sub2-r text-neutral-06">{time}</span>
        </div>
      </div>
    </div>
  );
};
