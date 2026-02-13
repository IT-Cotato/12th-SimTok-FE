import Image from "next/image";

interface MyMessageProps {
  content: string;
  time: string;
  isPrevSame?: boolean;
  isNextSame?: boolean;
}

export const MyMessage = ({
  content,
  time,
  isPrevSame,
  isNextSame,
}: MyMessageProps) => {
  const isImage = content.startsWith("blob:") || content.startsWith("http");
  const paddingTop = isPrevSame ? "pt-[2px]" : "pt-[10px]";
  const paddingBottom = isNextSame ? "pb-[2px]" : "pb-[10px]";
  return (
    <div
      className={`flex w-full justify-end px-4 ${paddingTop} ${paddingBottom}`}
    >
      <div className="flex max-w-[85%] items-end gap-1">
        {!isNextSame && (
          <span className="text-sub2-r text-neutral-06 mb-[2px] flex-shrink-0">
            {time}
          </span>
        )}
        {isImage ? (
          <div className="relative max-w-full overflow-hidden rounded-2xl">
            <img
              src={content}
              alt="전송 이미지"
              className="h-auto w-full object-cover"
            />
          </div>
        ) : (
          <div className="bg-green-02 rounded-2xl px-4 py-2">
            <p className="text-sub1-r break-all text-white">{content}</p>
          </div>
        )}
      </div>
    </div>
  );
};
