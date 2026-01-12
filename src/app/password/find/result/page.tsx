"use client";

import { useRouter } from "next/navigation";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { PageTitle } from "@/components/common/PageTitle";
import { PasswordBox } from "@/components/password/PasswordBox";

const FindPage = () => {
  //임시 비밀번호
  const password = "password";
  const router = useRouter();

  return (
    <main className="flex h-screen min-h-dvh w-full justify-center bg-white">
      <div className="mt-[13px] flex w-full flex-col whitespace-nowrap">
        <BackHeader title="비밀번호 찾기" />

        <PageTitle>기존에 사용하셨던 비밀번호예요.</PageTitle>

        <div className="mt-[76px] flex w-full flex-col px-4 py-[10px]">
          <PasswordBox password={password} />
        </div>

        <div className="mt-[415px] flex w-full justify-center px-4">
          <FullButton
            isActive={true}
            onClick={() => router.push("/login/phone")}
          >
            확인
          </FullButton>
        </div>
      </div>
    </main>
  );
};

export default FindPage;
