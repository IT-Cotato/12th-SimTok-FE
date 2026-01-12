"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { FullButton } from "@/components/common/FullButton";
import LoadingModal from "@/components/common/LoadingModal";
import { NameInput } from "@/components/common/NameInput";
import ProfileImagePicker from "@/components/onboarding/ProfileImagePicker";
import UploadButton from "@/components/onboarding/UploadButton";

import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";

const OnboardingProfileClient = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const isNameValid = name.trim().length > 0;

  const { profileImage, isLoading, uploadImage, resetImage, cancelUpload } =
    useProfileImageUpload();

  const handleCreateProfile = async () => {
    if (!isNameValid) return;

    // 1) 프로필 데이터 저장 (지금은 임시로 localStorage 예시)
    const profile = {
      name: name.trim(),
      imageUrl: profileImage ?? null,
    };
    try {
      // TODO: 실제 API로 교체
      // await fetch("/api/profile", { method: "POST", body: JSON.stringify(profile) });
      localStorage.setItem("onboardingProfile", JSON.stringify(profile));
    } catch (e) {
      // 에러 처리
      console.error(e);
      return;
    }
    // 2) 저장이 끝난 뒤에만 페이지 이동
    router.replace("/login");
  };

  return (
    <>
      <main className="flex h-screen min-h-dvh w-full justify-center">
        <div className="relative mt-[13px] flex h-full w-full flex-col">
          <section className="mt-[123px] px-4 py-2.5">
            <p className="text-d2 text-neutral-02 whitespace-pre-line">
              가족들에게 보여줄{"\n"}내 프로필을 만들어주세요
            </p>
          </section>
          <section className="mt-[86px] flex flex-col items-center">
            <div className="flex flex-col items-center gap-4">
              <ProfileImagePicker
                imageUrl={profileImage}
                onClick={() => setIsUploadOpen(true)}
              />
              <div className="w-full px-[118px]">
                <NameInput value={name} onChange={setName} />
              </div>
            </div>
          </section>

          <section className="mt-[210px] px-4 py-2.5">
            {!isUploadOpen && (
              <FullButton isActive={isNameValid} onClick={handleCreateProfile}>
                프로필생성하기
              </FullButton>
            )}
          </section>
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
