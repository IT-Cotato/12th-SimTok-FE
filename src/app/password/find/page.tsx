import { BackHeader } from "@/components/common/BackHeader";
import PageTitle from "@/components/common/PageTitle";
import PasswordForm from "@/components/password/PasswordForm";

const PasswordPage = () => {
  return (
    <main className="flex min-h-dvh justify-center bg-white">
      <div className="mt-[13px] flex h-full w-110 flex-col">
        <BackHeader title="비밀번호 찾기" />
        <PageTitle>비밀번호를 찾아볼까요?</PageTitle>
        <PasswordForm />
      </div>
    </main>
  );
};

export default PasswordPage;
