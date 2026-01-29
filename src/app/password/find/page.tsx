import { BackHeader } from "@/components/common/BackHeader";
import { PageTitle } from "@/components/common/PageTitle";
import { PasswordForm } from "@/components/password/PasswordForm";

const PasswordPage = () => {
  return (
    <main className="flex min-h-dvh w-full justify-center bg-white">
      <div className="flex h-full w-110 flex-col">
        <BackHeader title="비밀번호 재설정" />
        <div className="mt-13.5">
          <PageTitle>
            비밀번호를 다시 설정하려면 <br /> 확인이 필요해요
          </PageTitle>
        </div>

        <PasswordForm />
      </div>
    </main>
  );
};

export default PasswordPage;
