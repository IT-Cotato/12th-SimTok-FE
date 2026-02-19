import { ProfileImagePicker } from "../common/ProfileImagePicker";

interface FriendMessageProps {
  userName: string;
  profileImage?: string;
  content: string;
  time: string;
  isPrevSame?: boolean;
  isNextSame?: boolean;
  isImage?: boolean;
}

export const FriendMessage = ({
  userName,
  profileImage,
  content,
  time,
  isPrevSame,
  isNextSame,
}: FriendMessageProps) => {
  const isImage = content.startsWith("blob:") || content.startsWith("http");
  const paddingTop = isPrevSame ? "pt-[2px]" : "pt-[10px]";
  const paddingBottom = isNextSame ? "pb-[2px]" : "pb-[10px]";
  return (
    <div
      className={`flex w-full justify-start gap-[6px] px-4 ${paddingTop} ${paddingBottom}`}
    >
      <div className="w-12 flex-shrink-0">
        {!isPrevSame ? (
          <ProfileImagePicker
            imageUrl={profileImage || null}
            radius={16}
            width={48}
            height={48}
            canEdit={false}
          />
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
          {isImage ? (
            /* 이미지 렌더링 */
            <div className="relative max-w-full overflow-hidden rounded-2xl">
              <img
                src={content}
                alt="전송 이미지"
                className="h-auto w-full object-cover"
              />
            </div>
          ) : (
            /* 텍스트 렌더링 */
            <div className="bg-neutral-11 rounded-2xl px-4 py-[10px]">
              <p className="text-sub1-r text-neutral-01 break-all">{content}</p>
            </div>
          )}
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
