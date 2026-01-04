"use client";

type AlertBackdrop = "default" | "light" | "blur";

type AlertModalProps = {
  isOpen: boolean;
  title: string;

  message?: string;

  confirmLabel?: string;
  onClose: () => void;

  backdrop?: AlertBackdrop;

  isLoading?: boolean;
  loadingImageSrc?: string;
};

const BACKDROP_CLASS: Record<AlertBackdrop, string> = {
  default: "bg-dim-02",
  light: "bg-dim-01",
  blur: "bg-dim-01 backdrop-blur-[7px]",
};

const AlertModal = ({
  isOpen,
  title,
  message,
  confirmLabel = "확인",
  onClose,
  backdrop = "default",
  isLoading = false,
  loadingImageSrc,
}: AlertModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        BACKDROP_CLASS[backdrop]
      }`}
    >
      <div
        className="flex w-[316px] flex-col rounded-2xl bg-white"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex h-[47px] items-center justify-center">
          <p className="text-h3 text-neutral-01 text-center">{title}</p>
        </div>

        <div className="flex items-center justify-center px-[10px] py-[7px]">
          {isLoading && loadingImageSrc ? (
            <img
              src={loadingImageSrc}
              alt="loading"
              className="h-[48px] w-[48px]"
            />
          ) : (
            message && (
              <p className="text-sub2-r text-neutral-01 text-center">
                {message}
              </p>
            )
          )}
        </div>

        <div className="flex w-full">
          <button
            type="button"
            onClick={onClose}
            className="bg-mint-01 text-sub1-sb flex h-[45px] w-full items-center justify-center rounded-b-2xl text-white"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
