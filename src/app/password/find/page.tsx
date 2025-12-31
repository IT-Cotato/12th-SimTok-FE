import PageHeader from "@/components/Header";
import PageTitle from "@/components/PageTitle";

import PasswordForm from "./PasswordForm";

export default function PasswordPage() {
  return (
    <main className="flex min-h-dvh justify-center bg-white">
      <div className="mt-[13px] flex h-full w-110 flex-col">
        <PageHeader title="비밀번호 찾기" />
        <PageTitle>비밀번호를 찾아볼까요?</PageTitle>
        <PasswordForm />
      </div>
    </main>
  );
}
