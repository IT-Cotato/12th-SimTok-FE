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
            {/* {userProfileData && (
              <MyProfileCard
                userProfileData={userProfileData}
                onEdit={() => router.push("/mypage/profile")}
              />
            )} */}
          </section>
          <nav className="mt-10">
            <ul className="flex flex-col">
              {MY_PAGE_MENU_ITEMS.map(item => (
                <li key={item.label}>
                  <ListItem
                    label={item.label}
                    Icon={item.Icon}
                    onClick={() => router.push(item.path)}
                    hoverBg={true}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <NavBar />
    </main>
  );
};

export default MyPage;
