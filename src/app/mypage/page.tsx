"use client";

import { useRouter } from "next/navigation";

import { BackHeader } from "@/components/common/BackHeader";
import { NavBar } from "@/components/common/NavBar";
import { MenuItem } from "@/components/mypage/MenuItem";
import { MyProfileCard } from "@/components/mypage/MyProfileCard";

import { MY_PAGE_MENU_ITEMS } from "@/constants/mypage";

import { useUserProfile } from "@/hooks/useUserProfile";

const MyPage = () => {
  const router = useRouter();
  const { userProfileData } = useUserProfile();

  return (
    <main className="flex min-h-dvh w-full justify-center">
      <div className="mt-[13px] flex h-full w-110 flex-col">
        <BackHeader title="마이페이지" />
        <section className="mt-[18.5px]">
          {userProfileData && (
            <MyProfileCard userProfileData={userProfileData} />
          )}
        </section>
        <section className="mt-4">
          {MY_PAGE_MENU_ITEMS.map(item => (
            <MenuItem
              key={item.label}
              label={item.label}
              onClick={() => router.push(item.path)}
            />
          ))}
        </section>
      </div>
      <NavBar />
    </main>
  );
};

export default MyPage;
