"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import PhoneIcon from "@/assets/phone.svg";
import ProfileIcon from "@/assets/profile.svg";

import AlertModal from "@/components/AlertModal";
import FullButton from "@/components/FullButton";
import PageHeader from "@/components/Header";

import { formatPhone } from "@/utils/formatPhone";

export default function PasswordPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [focused, setFocused] = useState<"name" | "phone" | "code" | null>(
    null,
  );
  const [code, setCode] = useState("");

  const [isCodeRequested, setIsCodeRequested] = useState(false); // 인증번호받기 눌렀는지
  const [isVerified, setIsVerified] = useState(false); // 인증하기 완료 여부
  const [timeLeft, setTimeLeft] = useState(0); // 초 단위 (2분 = 120)

  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  const router = useRouter();

  //카운트다운
  useEffect(() => {
    if (!isCodeRequested || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isCodeRequested, timeLeft]);

  //확인 버튼 활성화: 인증 완료됐을 때만
  const isConfirmActive = isVerified;

  // 모달 확인 버튼 클릭
  const handleModalConfirm = () => {
    if (modalType === "success") {
      //성공: 하단 확인 버튼 활성화만 유지
      setModalType(null);
    } else if (modalType === "error") {
      //실패: 인증번호 재요청 가능하게 초기화
      setModalType(null);
      setIsCodeRequested(false);
      setTimeLeft(0);
      setCode("");
    }
  };

  // mm:ss 포맷으로 표시
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(1, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleRequestCode = () => {
    if (!phone) return;
    setIsCodeRequested(true);
    setIsVerified(false);
    setTimeLeft(120); // 2분
    // 실제로는 여기서 서버에 인증번호 요청 API 호출
  };

  const handleVerify = () => {
    if (!code || !isCodeRequested || timeLeft === 0) return;
    const isSuccess = code === "1234"; //추후 실제 검증 로직으로 교체
    if (isSuccess) {
      setIsVerified(true);
      setModalType("success");
    } else {
      setIsVerified(false);
      setModalType("error");
    }
  };

  const handleResendClick = () => {
    // 카운트다운 정지 + 버튼 재활성화
    setIsCodeRequested(false);
    setTimeLeft(0);
    setIsVerified(false);
  };

  // onChange 핸들러
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const onlyNumber = raw.replace(/\D/g, "");
    setPhone(onlyNumber); // state에는 숫자만
  };

  return (
    <main className="flex min-h-dvh justify-center bg-white">
      <div className="mt-[13px] flex h-full w-110 flex-col px-4">
        {/* 상단 헤더: 뒤로가기 */}
        <PageHeader title="비밀번호 찾기" />

        {/* 상단 타이틀 */}
        <div className="mt-[63px] flex w-full items-center gap-[10px] py-[10px]">
          <h1 className="text-neutral-02 text-d2">비밀번호를 찾아볼까요?</h1>
        </div>

        {/* 입력 필드 영역 */}
        <div className="mt-[65px] flex w-full flex-col gap-[10px] pt-[11px]">
          {/* 이름 */}
          <div
            className={`bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl border px-[10px] py-[8px] ${
              focused === "name" || name.length > 0
                ? "border-mint-01"
                : "border-neutral-08"
            }`}
          >
            <div className="pr-2.5">
              <ProfileIcon />
            </div>
            <input
              type="name"
              value={name}
              onChange={e => setName(e.target.value)}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(prev => (prev === "name" ? null : prev))}
              placeholder="이름"
              className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none"
            />
          </div>

          {/* 전화번호 + 인증번호 받기 */}
          <div className="flex w-full gap-[13px]">
            {/* 전화번호 입력 */}
            <div
              className={`bg-neutral-11 flex h-[55px] flex-1 items-center gap-[12px] rounded-2xl border px-[10px] py-[8px] ${
                focused === "phone" || phone.length > 0
                  ? "border-mint-01"
                  : "border-neutral-08"
              }`}
            >
              <PhoneIcon />
              <input
                type="tel"
                value={formatPhone(phone)}
                onChange={handlePhoneChange}
                onFocus={() => setFocused("phone")}
                onBlur={() =>
                  setFocused(prev => (prev === "phone" ? null : prev))
                }
                placeholder="전화번호"
                className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none"
              />
            </div>

            {/* 인증번호 받기 버튼 */}
            <button
              type="button"
              onClick={handleRequestCode}
              disabled={!phone || (isCodeRequested && timeLeft > 0)}
              className={`text-h2 flex h-[55px] cursor-pointer items-center justify-center rounded-2xl border px-[10px] py-[8px] whitespace-nowrap ${
                !phone
                  ? "border-neutral-08 text-neutral-06 border bg-white" // 입력 없음
                  : isCodeRequested && timeLeft > 0
                    ? "border-neutral-07 bg-neutral-07 text-white" // 클릭 후 카운트다운 중
                    : "bg-mint-01 text-white" // 입력 O, 아직 안 눌렀거나 카운트 끝난 후
              }`}
            >
              인증번호받기
            </button>
          </div>

          {/* 인증번호 + 인증하기 */}
          <div className="flex w-full gap-[13px]">
            {/* 인증번호 입력 */}
            <div className="flex flex-1 items-center gap-[10px]">
              <div
                className={`bg-neutral-11 flex h-[55px] flex-1 items-center gap-[13px] rounded-2xl border px-[10px] py-[8px] ${
                  focused === "code" || code.length > 0
                    ? "border-mint-01"
                    : "border-neutral-08"
                }`}
              >
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  onFocus={() => setFocused("code")}
                  onBlur={() =>
                    setFocused(prev => (prev === "code" ? null : prev))
                  }
                  placeholder="인증번호"
                  className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none"
                />
                {/* 카운트다운 */}
                {isCodeRequested && timeLeft > 0 && (
                  <span className="text-sub1-sb text-orange-00">
                    {formatTime(timeLeft)}
                  </span>
                )}
              </div>
            </div>

            {/* 인증하기 버튼 */}
            <button
              type="button"
              onClick={handleVerify}
              disabled={!code || !isCodeRequested || timeLeft === 0}
              className={`text-h2 flex h-[55px] w-[125px] cursor-pointer items-center justify-center rounded-2xl border px-[10px] py-[8px] ${
                !code || !isCodeRequested || timeLeft === 0
                  ? "border-neutral-08 text-neutral-06 bg-white"
                  : "border-mint-01 bg-mint-01 text-white"
              }`}
            >
              인증하기
            </button>
          </div>

          {/* 인증번호가 오지 않나요? */}
          {isCodeRequested && (
            <div className="flex w-full justify-end">
              <button
                type="button"
                onClick={handleResendClick}
                className="text-orange-00 cursor-pointer text-[10px] leading-[150%] underline"
              >
                인증번호가 오지 않나요?
              </button>
            </div>
          )}

          <div className="mt-[270px] flex w-full justify-center">
            <FullButton
              activeClass="bg-mint-01 text-white text-button-sb"
              inactiveClass="border border-neutral-08 bg-white text-neutral-06 text-button-sb"
              isActive={isConfirmActive}
              // 필요하면 onClick 추가
              // onClick={...}
            >
              확인
            </FullButton>
          </div>

          {/* 인증 결과 모달 */}
          {modalType && (
            <AlertModal
              isOpen={!!modalType}
              title={modalType === "success" ? "인증완료" : "인증오류"}
              message={
                modalType === "success"
                  ? "인증이 완료되었습니다."
                  : "인증번호를 확인할 수 없습니다."
              }
              onClose={handleModalConfirm}
            />
          )}
        </div>
      </div>
    </main>
  );
}
