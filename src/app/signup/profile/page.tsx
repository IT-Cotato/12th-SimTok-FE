import PageHeader from "@/components/common/Header";
import PageTitle from "@/components/common/PageTitle";
import ProfileForm from "@/components/signup/ProfileForm";

const RegisterPage = () => {
  return (
    <main className="flex min-h-dvh justify-center bg-white">
      <div className="mt-[13px] flex h-full w-110 flex-col">
        <PageHeader title="회원가입" />

        <PageTitle>
          회원가입을 위해 아래 정보를
          <br />
          입력해주세요.
        </PageTitle>
        <ProfileForm />
      </div>
    </main>
  );
};

export default RegisterPage;
