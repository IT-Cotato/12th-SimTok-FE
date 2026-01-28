"use client";

import PhoneIcon from "@/assets/phone.svg";

import { InputField } from "@/components/common/InputField";

import { formatPhone } from "@/utils/formatPhone";
import { formatTime } from "@/utils/formatTime";

interface PhoneAuthSectionProps {
  phone: string;
  onPhoneInput: React.ChangeEventHandler<HTMLInputElement>;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onRequest: () => void;
  canRequest: boolean;
  isRequested: boolean;
  code: string;
  onCodeChange: React.ChangeEventHandler<HTMLInputElement>;
  timeLeft: number;
  placeholder: string;
  onResend: () => void;
}

export const PhoneAuthSection = ({
  phone,
  onPhoneInput,
  focused,
  onFocus,
  onBlur,
  onRequest,
  canRequest,
  isRequested,
  code,
  onCodeChange,
  timeLeft,
  placeholder,
  onResend,
}: PhoneAuthSectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full gap-[10px] px-4">
        <div
          className={`bg-neutral-11 flex h-[55px] flex-1 items-center gap-[10px] rounded-2xl border px-[10px] py-2 transition-colors ${
            focused || phone.length > 0
              ? "border-mint-01"
              : "border-transparent"
          }`}
        >
          <div
            className={`transition-colors ${
              focused || phone.length > 0 ? "text-mint-01" : "text-neutral-07"
            }`}
          >
            <PhoneIcon className="h-6 w-6" />
          </div>
          <input
            type="tel"
            value={formatPhone(phone)}
            onChange={onPhoneInput}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="전화번호"
            className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none"
          />
        </div>
        <button
          type="button"
          onClick={onRequest}
          disabled={!canRequest || isRequested}
          className={`text-h2 flex h-[55px] cursor-pointer items-center justify-center rounded-2xl border px-[10px] py-[8px] whitespace-nowrap ${
            !canRequest
              ? "text-neutral-07 bg-neutral-11 border-transparent"
              : isRequested
                ? "border-neutral-07 bg-neutral-07 text-white"
                : "bg-mint-01 text-white"
          }`}
        >
          인증요청
        </button>
      </div>

      <div className="flex flex-col gap-2.5 px-4">
        <InputField
          placeholder={placeholder}
          value={code}
          onChange={onCodeChange}
          disabled={!isRequested || timeLeft === 0}
          suffix={
            isRequested &&
            timeLeft > 0 && (
              <span className="text-sub1-sb text-orange-00">
                {formatTime(timeLeft)}
              </span>
            )
          }
        />
        {isRequested && (
          <div className="flex w-full justify-start">
            <button
              type="button"
              onClick={onResend}
              className="text-orange-00 text-sub1-r cursor-pointer underline"
            >
              인증번호가 오지 않나요?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
