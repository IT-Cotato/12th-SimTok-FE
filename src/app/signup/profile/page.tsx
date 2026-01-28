import { BackHeader } from "@/components/common/BackHeader";
import { PageTitle } from "@/components/common/PageTitle";
import { ProfileForm } from "@/components/signup/ProfileForm";

const RegisterPage = () => {
  return (
    <main className="flex h-dvh w-full justify-center bg-white">
      <div className="flex w-110 flex-col">
        <BackHeader title="회원가입" />
        <div className="flex flex-1 flex-col">
          <PageTitle>
            회원가입을 위해 아래 정보를
            <br />
            입력해주세요.
          </PageTitle>
          <ProfileForm />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
