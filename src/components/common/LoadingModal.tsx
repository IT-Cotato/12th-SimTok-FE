"use client";

import { ALERT_BACKDROP_CLASS, AlertBackdrop } from "@/constants/alert";

interface LoadingModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  onClose: () => void;
  backdrop?: AlertBackdrop;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const LoadingModal = ({
  isOpen,
  title,
  message,
  confirmLabel = "확인",
  onClose,
  backdrop = "default",
  isLoading = false,
  icon,
}: LoadingModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        ALERT_BACKDROP_CLASS[backdrop]
      }`}
      onClick={onClose}
    >
      <div
        className="flex w-[316px] flex-col rounded-2xl bg-white"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex h-[47px] items-center justify-center">
          <p className="text-h3 text-neutral-01 text-center">{title}</p>
        </div>

        <div className="flex items-center justify-center px-5">
          {message && (
            <p className="text-sub2-r text-neutral-01 text-center whitespace-pre-wrap">
              {message}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center justify-center pt-[21px] pb-3">
          {isLoading ? (
            <span className="loader" />
          ) : (
            <div className="flex items-center justify-center">{icon}</div>
          )}
        </div>

        <div className="flex w-full">
          <button
            type="button"
            onClick={onClose}
            className="bg-mint-01 text-sub1-sb flex h-[66px] w-full items-center justify-center rounded-b-2xl text-white"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
