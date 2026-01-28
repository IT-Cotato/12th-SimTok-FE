import CheckIcon from "@/assets/check.svg";
import DownArrow from "@/assets/down-arrow.svg";

import { CHAT_FREQUENCY_OPTIONS } from "@/constants/friendsSettings";

interface ChatFrequencyModalProps {
  value?: number;
  onChange: (value: number) => void;
  onClose: () => void;
}

export const ChatFrequencyModal = ({
  value,
  onChange,
  onClose,
}: ChatFrequencyModalProps) => {
  // 현재 선택된 라벨 찾기 (값이 없으면 기본 텍스트 표시 가능)
  const currentLabel =
    CHAT_FREQUENCY_OPTIONS.find(o => o.value === value)?.label ?? "";

  // 선택 핸들러: 값 변경 후 모달 닫기
  const handleSelect = (selectedValue: number) => {
    onChange(selectedValue);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <section className="relative z-10 w-[90%] max-w-[400px] overflow-hidden rounded-2xl shadow-xl">
        <div
          className={`${!currentLabel ? "justify-end" : "justify-between"} bg-mint-01 flex h-[55px] items-center px-4 py-2`}
          onClick={onClose}
        >
          <div className="text-h2 text-white">{currentLabel}</div>
          <DownArrow className="h-6 w-6 rotate-180 text-white" />
        </div>

        <ul className="bg-white">
          {CHAT_FREQUENCY_OPTIONS.map(({ value: days, label }) => {
            const isSelected = value === days;

            return (
              <li key={days}>
                <button
                  type="button"
                  onClick={() => handleSelect(days)}
                  className="hover:bg-neutral-05/10 flex h-[55px] w-full items-center justify-between px-4 py-2 transition-colors"
                >
                  <span className="text-h2 text-neutral-07">{label}</span>

                  <div
                    className={`relative flex h-5 w-5 items-center justify-center rounded-full border ${
                      isSelected
                        ? "bg-mint-01 border-transparent"
                        : "border-neutral-08"
                    }`}
                  >
                    {isSelected && <CheckIcon className="h-4 w-4 text-white" />}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
