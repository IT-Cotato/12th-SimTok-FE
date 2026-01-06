"use client";

type AlertModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onClose: () => void;
};

export const AlertModal = ({
  isOpen,
  title,
  message,
  confirmLabel = "확인",
  onClose,
}: AlertModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="bg-dim-02 fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="flex w-[316px] flex-col rounded-2xl bg-white"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex h-[47px] items-center justify-center">
          <p className="text-h3 text-neutral-01 text-center">{title}</p>
        </div>

        <div className="flex items-center justify-center px-[10px] py-[7px]">
          <p className="text-sub2-r text-neutral-01 text-center">{message}</p>
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
