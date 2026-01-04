"use client";

import { useState } from "react";

import AlertModal from "@/components/common/AlertModal";
import FullButton from "@/components/common/FullButton";
import NameInput from "@/components/common/NameInput";
import ProfileImagePicker from "@/components/onboarding/ProfileImagePicker";
import UploadAlert from "@/components/onboarding/UploadAlert";

import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";

const OnboardingProfileClient = () => {
  const [name, setName] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const isNameValid = name.trim().length > 0;

  const { profileImage, isLoading, uploadImage, resetImage } =
    useProfileImageUpload();

  return (
    <>
      <main className="flex min-h-dvh justify-center">
        <div className="mt-[13px] flex h-full w-[440px] flex-col">
          <section className="mt-[123px] px-4 py-2.5">
            <p className="text-d2 text-neutral-02 whitespace-pre-line">
              가족들에게 보여줄{"\n"}내 프로필을 만들어주세요
            </p>
          </section>
          <section className="mt-[86px] flex flex-col items-center">
            <ProfileImagePicker
              imageUrl={profileImage}
              onClick={() => setIsUploadOpen(true)}
            />
            <div className="mt-4 w-full px-[118px]">
              <NameInput value={name} onChange={setName} />
            </div>
          </section>

          <section className="mt-[210px] mb-[42px] px-4 py-2.5">
            <FullButton isActive={isNameValid}>프로필생성하기</FullButton>
          </section>
        </div>
      </main>
      <UploadAlert
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSelectAlbum={file => {
          uploadImage(file);
          setIsUploadOpen(false);
        }}
        onSelectDefault={() => {
          resetImage();
          setIsUploadOpen(false);
        }}
      />

      <AlertModal
        isOpen={isLoading}
        title="로딩중"
        confirmLabel="취소하기"
        isLoading
        loadingImageSrc="/loading.gif"
        backdrop="blur"
        onClose={() => {}}
      />
    </>
  );
};

export default OnboardingProfileClient;
