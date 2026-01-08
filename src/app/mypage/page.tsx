"use client";

import { useRouter } from "next/navigation";

import { BackHeader } from "@/components/common/BackHeader";
import { NavBar } from "@/components/common/NavBar";

const menuItems = [
  "내 프로필 설정",
  "메시지 예약내역",
  "알림설정",
  "배경화면",
  "고객센터",
];

const baseItemClass =
  "flex h-[71px] w-full items-center py-5 border-b border-neutral-10 text-h2 text-neutral-04 cursor-pointer";

const MyPage = () => {
  const router = useRouter();

  const handleClick = (label: string) => {
    if (label === "알림설정") {
      router.push("/mypage/alarm");
      return;
    } else if (label === "고객센터") {
      router.push("/mypage/cs");
      return;
    }
  };
  return (
    <main className="flex min-h-dvh justify-center">
      <div className="mt-[13px] flex h-full w-110 flex-col px-4">
        <BackHeader title="마이페이지" />
        <section className="mt-[18.5px]">
          {menuItems.map(label => (
            <button
              key={label}
              type="button"
              className={baseItemClass}
              onClick={() => handleClick(label)}
            >
              {label}
            </button>
          ))}
        </section>
      </div>
      <NavBar />
    </main>
  );
};

export default MyPage;
