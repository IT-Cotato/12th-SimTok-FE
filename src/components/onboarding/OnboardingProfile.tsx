"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { type ProfileData, profileApi } from "@/app/api/profile";

import { FullButton } from "@/components/common/FullButton";
import LoadingModal from "@/components/common/LoadingModal";
import UploadButton from "@/components/onboarding/UploadButton";

//import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";
import { ProfileWrapper } from "../common/ProfileWrapper";

const OnboardingProfileClient = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    const loadInitialData = async () => {
      const result = await profileApi.getProfile();
      if (result.success) {
        setName(result.data.name);
      }
    };
    loadInitialData();
  }, []);

  const isNameValid = name.trim().length > 0;

  // const { profileImage, isLoading, uploadImage, resetImage, cancelUpload } =
  //   useProfileImageUpload();

  // const handleCreateProfile = async () => {
  //   if (!isNameValid) return;

  //   const profile = {
  //     name: name.trim(),
  //     imageUrl: profileImage ?? null,
  //   };
  //   try {
  //     localStorage.setItem("onboardingProfile", JSON.stringify(profile));
  //   } catch (e) {
  //     console.error(e);
  //     return;
  //   }
  //   router.replace("/");
  // };
  const handleCreateProfile = async () => {
    if (!isNameValid) return;

    try {
      // POST API 호출 (S3 업로드된 URL 또는 null 전송)
      const result = await profileApi.createProfile(uploadedImageUrl);

      if (result.success) {
        router.replace("/");
      } else {
        alert("프로필 생성에 실패했습니다.");
      }
    } catch (e) {
      console.error("프로필 생성 에러:", e);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const preRes = await profileApi.getPresignedUrl(file.name);
      if (!preRes.success) return;

      const { presignedUrl, imageUrl, contentType } = preRes.data;
      const isS3Success = await profileApi.uploadToS3(
        presignedUrl,
        file,
        contentType,
      );

      if (isS3Success) {
        setUploadedImageUrl(imageUrl); // 최종 S3 주소 저장
      }
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    } finally {
      setIsUploadOpen(false);
    }
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
                //imageUrl={profileImage}
                imageUrl={uploadedImageUrl}
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
        onSelectAlbum={handleImageUpload}
        onSelectDefault={() => {
          setUploadedImageUrl(null);
          setIsUploadOpen(false);
        }}
      />

      <LoadingModal
        isOpen={isUploading}
        title="로딩중"
        confirmLabel="취소하기"
        isLoading
        backdrop="blur"
        onClose={() => setIsUploading(false)}
      />
    </>
  );
};

export default OnboardingProfileClient;
