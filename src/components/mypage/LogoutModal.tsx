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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
    >
      <div className="flex w-full max-w-[316px] flex-col overflow-hidden rounded-[20px] bg-white pt-[10px]">
        <div className="flex flex-col items-center gap-1 px-6 pb-4">
          <h3 id="logout-modal-title" className="text-h3 text-neutral-01">
            로그아웃
          </h3>
          <p className="text-sub1-r text-neutral-02 mt-2 text-center">
            로그아웃 하시겠어요?
          </p>
        </div>
        <div className="border-neutral-11 flex h-[64px] w-full border-t">
          <button
            type="button"
            onClick={onClose}
            className="text-sub1-sb text-neutral-05 active:bg-neutral-11 flex flex-1 cursor-pointer items-center justify-center bg-white"
          >
            취소할래요
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="text-sub1-sb bg-red-01 flex flex-1 cursor-pointer items-center justify-center text-white"
          >
            네, 로그아웃할래요
          </button>
        </div>
      </div>
    </div>
  );
};
