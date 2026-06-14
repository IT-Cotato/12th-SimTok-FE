"use client";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal = ({
  isOpen,
  onClose,
  onConfirm,
}: LogoutModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div className="flex w-full max-w-[316px] flex-col overflow-hidden rounded-[20px] bg-white pt-[10px]">
        <div className="flex flex-col items-center gap-1 px-6 pb-4">
          <h3 className="text-h3 text-neutral-01">로그아웃</h3>
          <p className="text-sub1-r text-neutral-06 mt-2 text-center">
            로그아웃 하시겠어요?
          </p>
        </div>
        <div className="border-neutral-11 flex h-[64px] w-full border-t">
          <button
            onClick={onClose}
            className="text-sub1-sb text-neutral-05 active:bg-neutral-11 flex flex-1 cursor-pointer items-center justify-center bg-white"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="text-sub1-sb bg-red-01 flex flex-1 cursor-pointer items-center justify-center text-white"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};
