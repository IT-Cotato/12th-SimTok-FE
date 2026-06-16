"use client";

import { useEffect, useRef, useState } from "react";

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
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div className="flex w-full max-w-[316px] flex-col rounded-[20px] bg-white pt-[10px]">
        <div className="flex flex-col items-center gap-1 px-6 pb-4">
          <h3 className="text-h3 text-neutral-01">회원 탈퇴 안내</h3>
          <p className="text-sub1-r text-neutral-02 mt-2 text-center">
            정말 탈퇴하시겠습니까?
            <br />
            탈퇴 시 작성하신 모든 데이터가
            <br />
            영구 삭제되며 복구할 수 없습니다.
          </p>
          <p className="text-sub1-sb text-neutral-02 mt-4 w-full text-left">
            탈퇴 하시는 이유를 알려주세요
          </p>
          <div ref={dropdownRef} className="relative mt-3 w-full">
            <button
              type="button"
              onClick={() => setOpen(prev => !prev)}
              className="text-sub1-r text-neutral-03 border-neutral-09 flex w-full items-center justify-between rounded-[10px] border bg-white px-3 py-2 focus:outline-none"
            >
              <span>{reason}</span>
              <svg
                className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {open && (
              <ul className="border-neutral-09 absolute z-10 mt-1 w-full overflow-hidden rounded-[10px] border bg-white shadow-md">
                {WITHDRAW_REASONS.map(r => (
                  <li
                    key={r}
                    onClick={() => {
                      setReason(r);
                      setOpen(false);
                    }}
                    className={`text-sub1-r cursor-pointer px-3 py-2 hover:bg-neutral-100 ${r === reason ? "text-neutral-01 font-semibold" : "text-neutral-03"}`}
                  >
                    {r}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="border-neutral-11 flex h-[64px] w-full overflow-hidden rounded-b-[20px] border-t">
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
