"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { deleteAccount, logout } from "@/app/api/auth/auth.api";

import { BackHeader } from "@/components/common/BackHeader";
import LoadingModal from "@/components/common/LoadingModal";
import { NavBar } from "@/components/common/NavBar";
import { ListItem } from "@/components/mypage/ListItem";
import { LogoutModal } from "@/components/mypage/LogoutModal";
import { ProfileCard } from "@/components/mypage/ProfileCard";
import { WithdrawModal } from "@/components/mypage/WithdrawModal";

import { MY_PAGE_MENU_ITEMS } from "@/constants/mypage";

import { useUserProfile } from "@/hooks/useUserProfile";

const MyPage = () => {
  const router = useRouter();
  const { userProfileData } = useUserProfile();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isWithdrawCompleteOpen, setIsWithdrawCompleteOpen] = useState(false);

  const handleWithdraw = async () => {
    try {
      await deleteAccount();
      setIsWithdrawModalOpen(false);
      setIsWithdrawCompleteOpen(true);
    } catch (e: unknown) {
      const err = e as { response?: { data?: unknown; status?: number } };
      console.error(
        "회원탈퇴 실패:",
        err?.response?.status,
        err?.response?.data,
      );
      alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
      setIsWithdrawModalOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {}
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
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
                        : item.label === "회원탈퇴"
                          ? () => setIsWithdrawModalOpen(true)
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
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onConfirm={() => handleWithdraw()}
      />
      <LoadingModal
        isOpen={isWithdrawCompleteOpen}
        title="탈퇴 완료"
        message={
          "심톡 회원 탈퇴가 완료되었습니다.\n7일 내로 다시 로그인하시면 \n탈퇴가 즉시 취소됩니다."
        }
        onClose={() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }}
      />
    </main>
  );
};

export default MyPage;
