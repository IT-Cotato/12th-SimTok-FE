"use client";

import Image from "next/image";

interface ExitChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
  profileImg: string;
}

export const ExitChatModal = ({
  isOpen,
  onClose,
  onConfirm,
  userName,
  profileImg,
}: ExitChatModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div className="flex w-full max-w-[316px] flex-col overflow-hidden rounded-[20px] bg-white pt-[10px]">
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-h3 text-neutral-01">채팅방 나가기</h3>

          <div className="relative mb-2 h-[80px] w-[80px] overflow-hidden rounded-[24px]">
            {profileImg ? (
              <Image
                src={profileImg}
                alt={userName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="bg-neutral-08 h-full w-full" />
            )}
          </div>

          <div className="flex flex-col items-center">
            <span className="text-sub1-r text-neutral-03">{userName}</span>
            <p className="text-sub2-r text-neutral-06">
              지금까지의 나눈 대화가 모두 사라져요
            </p>
          </div>
        </div>

        <div className="border-neutral-11 flex h-[64px] w-full border-t">
          <button
            onClick={onClose}
            className="text-sub1-sb text-neutral-05 active:bg-neutral-11 flex flex-1 items-center justify-center bg-white"
          >
            취소할래요
          </button>
          <button
            onClick={onConfirm}
            className="text-sub1-sb bg-red-01 flex flex-1 items-center justify-center text-white"
          >
            네, 나갈래요
          </button>
        </div>
      </div>
    </div>
  );
};
