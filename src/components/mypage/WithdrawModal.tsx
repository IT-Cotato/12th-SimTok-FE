"use client";

import { useState } from "react";

const WITHDRAW_REASONS = [
  "서비스가 불만족스러워요",
  "사용 빈도가 낮아요",
  "개인정보 보호가 걱정돼요",
  "다른 서비스를 이용할게요",
  "기타",
];

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
  const [reason, setReason] = useState(WITHDRAW_REASONS[0]);

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
          <p className="text-sub1-sb text-neutral-02 mt-4 w-full text-left">
            탈퇴 하시는 이유를 알려주세요
          </p>
          <select
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="text-sub1-r text-neutral-03 border-neutral-09 mt-3 w-full rounded-[10px] border px-3 py-2 focus:outline-none"
          >
            {WITHDRAW_REASONS.map(r => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
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
