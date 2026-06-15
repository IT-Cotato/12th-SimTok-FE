"use client";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const WithdrawModal = ({
  isOpen,
  onClose,
  onConfirm,
}: WithdrawModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div className="flex w-full max-w-[316px] flex-col overflow-hidden rounded-[20px] bg-white pt-[10px]">
        <div className="flex flex-col items-center gap-1 px-6 pb-4">
          <h3 className="text-h3 text-neutral-01">회원탈퇴</h3>
          <p className="text-sub1-r text-neutral-02 mt-2 text-center">
            정말 탈퇴하시겠습니까?
            <br />
            탈퇴 시 작성하신 게시글 및 모든 정보가
            <br />
            삭제되며 복구할 수 없습니다.
          </p>
        </div>
        <div className="border-neutral-11 flex h-[64px] w-full border-t">
          <button
            onClick={onClose}
            className="text-sub1-sb text-neutral-05 active:bg-neutral-11 flex flex-1 cursor-pointer items-center justify-center bg-white"
          >
            취소할래요
          </button>
          <button
            onClick={onConfirm}
            className="text-sub1-sb bg-red-01 flex flex-1 cursor-pointer items-center justify-center text-white"
          >
            네, 탈퇴할래요
          </button>
        </div>
      </div>
    </div>
  );
};
