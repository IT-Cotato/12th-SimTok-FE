"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { logout } from "@/app/api/auth/auth.api";

import { BackHeader } from "@/components/common/BackHeader";
import { NavBar } from "@/components/common/NavBar";
import { ListItem } from "@/components/mypage/ListItem";
import { LogoutModal } from "@/components/mypage/LogoutModal";
import { ProfileCard } from "@/components/mypage/ProfileCard";

import { MY_PAGE_MENU_ITEMS } from "@/constants/mypage";

import { useUserProfile } from "@/hooks/useUserProfile";

const MyPage = () => {
  const router = useRouter();
  const { userProfileData } = useUserProfile();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // 토큰 만료 등으로 401이 와도 클라이언트 로그아웃은 진행
    }
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <main className="flex min-h-dvh w-full flex-col">
      <div className="flex flex-1 justify-center">
        <div className="mt-[13px] flex h-full w-110 flex-col pb-30">
          <BackHeader title="마이페이지" />
          <section className="mt-[18.5px]">
            {userProfileData && (
              <ProfileCard
                data={{
                  name: userProfileData.name || "이름 없음",
                  profileImageUrl:
                    userProfileData.profileImageUrl ||
                    "/images/onboarding_profile.svg",
                }}
                onEdit={() => router.push("/mypage/profile")}
                isMyPage={true}
              />
            )}
          </section>
          <nav className="mt-10">
            <ul className="flex flex-col">
              {MY_PAGE_MENU_ITEMS.map(item => (
                <li key={item.label}>
                  <ListItem
                    label={item.label}
                    Icon={item.Icon}
                    onClick={
                      item.label === "로그아웃"
                        ? () => setIsLogoutModalOpen(true)
                        : () => router.push(item.path)
                    }
                    hoverBg={true}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <NavBar />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </main>
  );
};

export default MyPage;
