"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { FullButton } from "@/components/common/FullButton";
import LoadingModal from "@/components/common/LoadingModal";
import UploadButton from "@/components/onboarding/UploadButton";

import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";

import { ProfileWrapper } from "../common/ProfileWrapper";

const OnboardingProfileClient = () => {
  const router = useRouter();

  //추후에 실제 데이터 소스에 따라 이름 변경할거임
  const [name, setName] = useState("김잇다"); //회원가입 데이터 기반
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const isNameValid = name.trim().length > 0;

  const { profileImage, isLoading, uploadImage, resetImage, cancelUpload } =
    useProfileImageUpload();

  const handleCreateProfile = async () => {
    if (!isNameValid) return;

    const profile = {
      name: name.trim(),
      imageUrl: profileImage ?? null,
    };
    try {
      localStorage.setItem("onboardingProfile", JSON.stringify(profile));
    } catch (e) {
      console.error(e);
      return;
    }
    router.replace("/");
  };

  return (
    <>
      <main className="flex min-h-dvh w-full justify-center">
        <div className="flex w-full max-w-110 flex-col">
          <div className="flex flex-1 flex-col">
            <section className="mt-[123px] px-4 py-2.5">
              <p className="text-d2 text-neutral-02 whitespace-pre-line">
                가족들에게 보여줄{"\n"}내 프로필을 만들어주세요
              </p>
            </section>

            <section className="mt-[86px] flex flex-col items-center">
              <ProfileWrapper
                imageUrl={profileImage}
                name={name}
                //onChangeName={setName}
                onProfileClick={() => setIsUploadOpen(true)}
                canEdit={true}
                showInput={true}
              />
            </section>
          </div>

          {!isUploadOpen && (
            <section className="mb-13 px-4 py-[10px]">
              <FullButton isActive={isNameValid} onClick={handleCreateProfile}>
                프로필생성하기
              </FullButton>
            </section>
          )}
        </div>
      </main>

      <UploadButton
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSelectAlbum={async file => {
          try {
            await uploadImage(file);
            setIsUploadOpen(false);
          } catch (error) {
            console.error("이미지 업로드 실패:", error);
          }
        }}
        onSelectDefault={() => {
          resetImage();
          setIsUploadOpen(false);
        }}
      />

      <LoadingModal
        isOpen={isLoading}
        title="로딩중"
        confirmLabel="취소하기"
        isLoading
        backdrop="blur"
        onClose={cancelUpload}
      />
    </>
  );
};

export default OnboardingProfileClient;
