// src/app/auth/login/page.tsx
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh justify-center bg-white">
      {/* 440 × 956 프레임 */}
      <div className="flex h-[956px] w-[440px] flex-col justify-between px-4 py-8">
        {/* 상단 로고 영역 */}
        <div className="flex flex-1 items-center justify-center">
          <span className="text-[13px] font-medium text-[var(--color-neutral-02)]">
            LOGO
          </span>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex flex-col gap-3 pb-6">
          {/* 카카오 로그인 버튼 */}
          <button
            type="button"
            className="flex h-[58px] w-full items-center justify-center gap-2 rounded-[16px] bg-[#FEE500]"
          >
            <Image
              src="/icons/kakao.svg"
              alt="카카오 로그인"
              width={30}
              height={30}
            />
            <span className="text-[15px] font-medium text-black">
              카카오 로그인
            </span>
          </button>

          {/* 일반 로그인 버튼 */}
          <button
            type="button"
            className="flex h-[58px] w-full items-center justify-center rounded-[16px] border border-[var(--color-neutral-08)] bg-white"
          >
            <span className="text-[15px] text-[var(--color-neutral-02)]">
              로그인
            </span>
          </button>

          {/* 회원가입 버튼 */}
          <button
            type="button"
            className="flex h-[58px] w-full items-center justify-center rounded-[16px] bg-[var(--color-neutral-01)]"
          >
            <span className="text-[15px] text-white">회원가입</span>
          </button>
        </div>
      </div>
    </main>
  );
}
