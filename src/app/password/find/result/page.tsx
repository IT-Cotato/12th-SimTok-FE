"use client";

import { useRouter } from "next/navigation";

import FullButton from "@/components/FullButton";
import PageHeader from "@/components/Header";
import PageTitle from "@/components/PageTitle";
import PasswordBox from "@/components/PasswordBox";

export default function FindPage() {
  //임시 비밀번호
  const password = "password";
  const router = useRouter();

  return (
    <main className="flex min-h-dvh justify-center bg-white">
      <div className="mt-[13px] flex h-full w-110 flex-col">
        <PageHeader title="비밀번호 찾기" />

        <PageTitle>기존에 사용하셨던 비밀번호예요.</PageTitle>

        <div className="mt-[76px] flex w-full flex-col px-4 py-[10px]">
          <PasswordBox password={password} />
        </div>

        <div className="mt-[415px] flex w-full justify-center px-4">
          <FullButton
            isActive={true}
            onClick={() => router.push("/login/phone")} // auth/login 대신 새 경로라면 여기 수정
          >
            확인
          </FullButton>
        </div>
      </div>
    </main>
  );
}
