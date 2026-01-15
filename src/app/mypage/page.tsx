"use client";

import { useRouter } from "next/navigation";

import { BackHeader } from "@/components/common/BackHeader";
import { NavBar } from "@/components/common/NavBar";
import { MenuItem } from "@/components/mypage/MenuItem";

import { MY_PAGE_MENU_ITEMS } from "@/constants/mypage";

const MyPage = () => {
  const router = useRouter();

  return (
    <main className="flex min-h-dvh w-full justify-center">
      <div className="mt-[13px] flex h-full w-110 flex-col px-4">
        <BackHeader title="마이페이지" />
        <section className="mt-[18.5px]">
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
