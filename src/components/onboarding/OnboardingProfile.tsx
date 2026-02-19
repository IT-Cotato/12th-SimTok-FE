"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { profileApi } from "@/app/api/profile";

import { FullButton } from "@/components/common/FullButton";
import LoadingModal from "@/components/common/LoadingModal";
import UploadButton from "@/components/onboarding/UploadButton";

import { useImageUpload } from "@/hooks/useImageUpload";

import { ProfileWrapper } from "../common/ProfileWrapper";

const OnboardingProfileClient = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const result = await profileApi.getProfile();
        if (result.success) {
          setName(result.data.name);
        }
      } catch (err) {
        console.error("초기 프로필 로드 실패:", err);
      }
    };
    loadInitialData();
  }, []);

  const isNameLoaded = name.trim().length > 0;

  const handleCreateProfile = async () => {
    if (!isNameLoaded || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await profileApi.createProfile(
        name.trim(),
        uploadedImageUrl,
      );

      if (result.success) {
        router.replace("/");
      } else {
        console.error("프로필 생성에 실패했습니다.");
      }
    } catch (e) {
      console.error("프로필 생성 에러:", e);
    }
  };

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
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
      setIsUploading(false);
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
                가족에게 보여줄{"\n"}내 사진을 골라볼까요?
              </p>
            </section>

            <section className="mt-[86px] flex flex-col items-center">
              <ProfileWrapper
                imageUrl={uploadedImageUrl}
                name={name}
                onProfileClick={() => setIsUploadOpen(true)}
                canEdit={true}
                showInput={true}
              />
            </section>
          </div>

          {!isUploadOpen && (
            <section className="mb-13 px-4 py-[10px]">
              <FullButton
                isActive={isNameLoaded && !isSubmitting}
                onClick={handleCreateProfile}
              >
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
