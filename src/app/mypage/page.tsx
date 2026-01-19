"use client";

import { useRouter } from "next/navigation";

import { BackHeader } from "@/components/common/BackHeader";
import { NavBar } from "@/components/common/NavBar";
import { ListItem } from "@/components/mypage/ListItem";
import { MyProfileCard } from "@/components/mypage/MyProfileCard";

import { MY_PAGE_MENU_ITEMS } from "@/constants/mypage";

import { useUserProfile } from "@/hooks/useUserProfile";

const MyPage = () => {
  const router = useRouter();
  const { userProfileData } = useUserProfile();

  return (
    <main className="flex min-h-dvh w-full flex-col">
      <div className="flex flex-1 justify-center">
        <div className="mt-[13px] flex h-full w-110 flex-col pb-30">
          <BackHeader title="마이페이지" />
          <section className="mt-[18.5px]">
            {userProfileData && (
              <MyProfileCard userProfileData={userProfileData} />
            )}
          </section>
          <section className="mt-10 flex flex-col gap-[26px]">
            {MY_PAGE_MENU_ITEMS.map(item => (
              <ListItem
                key={item.label}
                label={item.label}
                Icon={item.Icon}
                onClick={() => router.push(item.path)}
              />
            ))}
          </section>
        </div>
      </div>
      <NavBar />
    </main>
  );
};

export default MyPage;
