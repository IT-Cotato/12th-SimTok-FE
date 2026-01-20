"use client";

import { useRouter } from "next/navigation";

const AuthStartPage = () => {
  const router = useRouter();

  const handleClickLogin = () => {
    router.push("/login/phone");
  };

  return (
    <main className="flex min-h-dvh w-full justify-center">
      <div className="flex h-full w-110 flex-col gap-[197px]">
        <div className="mt-[289px] flex w-full items-center justify-center px-4 py-2.5">
          <span className="text-d1 text-mint-01 flex items-center justify-center">
            SIMTOK
          </span>
        </div>

        <div className="flex flex-col gap-[10px] py-[10px]">
          <div className="px-4">
            <button
              type="button"
              className="border-neutral-08 text-button-sb bg-mint-01 flex h-14.5 w-full cursor-pointer items-center justify-center rounded-2xl border px-3.5 text-white"
              onClick={handleClickLogin}
            >
              로그인
            </button>
          </div>

          <div className="px-4">
            <button
              type="button"
              className="text-button-sb text-mint-01 flex h-14.5 w-full cursor-pointer items-center justify-center rounded-2xl bg-white px-3.5"
              onClick={() => router.push("/signup/agree")}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthStartPage;
