"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";

import profileData from "@/mock/myProfile.json";

//TODO: 친구코드에 따라서 프로필 정보 가져오기 기능 추가
const FriendAddPage = () => {
  const router = useRouter();
  return (
    <main className="bg-radial-yellowgreen-mintgreen w-full">
      <section className="mt-[8.5px]">
        <BackHeader />
      </section>
      <h1 className="text-d2 text-neutral-02 mt-[58.5px] px-4 py-[10px]">
        친구를 목록에 추가할까요?
      </h1>
      <section className="mt-[171px] flex flex-col items-center justify-center gap-4">
        <Image
          src={profileData.profileImg}
          alt="프로필 이미지"
          width={174}
          height={174}
          className="rounded-[36px] object-cover"
        />
        <p className="text-h2 text-neutral-01">{profileData.userName}</p>
      </section>
      <section className="fixed bottom-0 w-full max-w-[440px] bg-white px-4 py-[52px] pt-[10px]">
        <FullButton
          onClick={() => router.push(`/friends/settings/${profileData.userId}`)}
        >
          추가하기
        </FullButton>
      </section>
    </main>
  );
};

export default FriendAddPage;
