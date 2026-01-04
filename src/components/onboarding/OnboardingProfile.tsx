"use client";

import { useState } from "react";

import ProfileIcon from "@/assets/onboarding_profile.svg";
import PhotoIcon from "@/assets/photo.svg";

import AlertModal from "@/components/common/AlertModal";
import FullButton from "@/components/common/FullButton";
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
            <div
              className="relative flex h-[160px] w-[160px] items-center justify-center"
              onClick={() => setIsUploadOpen(true)}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="프로필 이미지"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ProfileIcon />
              )}
              <button
                type="button"
                className="absolute right-[16px] bottom-[16px] h-[32px] w-[32px] items-center justify-center"
              >
                <PhotoIcon />
              </button>
            </div>
            <div className="mt-4 w-full px-[118px]">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="이름을 입력해주세요"
                className="border-mint-01 text-d3 text-neutral-01 placeholder:text-neutral-07 focus:border-mint-01 w-full rounded-2xl border px-4 py-2 text-center outline-none focus:ring-0"
              />
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
