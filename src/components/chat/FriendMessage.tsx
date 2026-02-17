interface FriendMessageProps {
  userName: string;
  profileImage?: string;
  content: string;
  time: string;
  isPrevSame?: boolean;
  isNextSame?: boolean;
}

export const FriendMessage = ({
  userName,
  profileImage,
  content,
  time,
  isPrevSame,
  isNextSame,
}: FriendMessageProps) => {
  const paddingTop = isPrevSame ? "pt-[2px]" : "pt-[10px]";
  const paddingBottom = isNextSame ? "pb-[2px]" : "pb-[10px]";
  return (
    <div
      className={`flex w-full justify-start gap-[6px] px-4 ${paddingTop} ${paddingBottom}`}
    >
      <div className="w-12 flex-shrink-0">
        {!isPrevSame ? (
          <div className="bg-neutral-08 h-12 w-12 overflow-hidden rounded-2xl">
            {profileImage && (
              <img
                src={profileImage}
                alt={userName}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ) : (
          /* 시간까지 같은 연속 메시지일 경우 빈 공간 확보 */
          <div className="w-12" />
        )}
      </div>

      <div className="flex max-w-[calc(100%-60px)] flex-col gap-2">
        {!isPrevSame && (
          <span className="text-sub2-r text-neutral-05 mb-1">{userName}</span>
        )}
        <div className="flex items-end gap-1">
          <div className="bg-neutral-11 rounded-2xl px-4 py-[10px]">
            <p className="text-sub1-r text-neutral-01 break-all">{content}</p>
          </div>
          {!isNextSame && (
            <span className="text-sub2-r text-neutral-06 mb-[2px] flex-shrink-0">
              {time}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
