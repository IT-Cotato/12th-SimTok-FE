"use client";
import { useRouter } from "next/navigation";

import { BackHeader } from "@/components/common/BackHeader";
import { MenuItem } from "@/components/mypage/MenuItem";

import { CS_MENU_ITEMS } from "@/constants/cs";

const CustomerServicePage = () => {
  const router = useRouter();
  return (
    <main className="flex min-h-dvh w-full justify-center">
      <div className="mt-[13px] flex h-full w-110 flex-col px-4">
        <BackHeader title="고객센터" />
        <section className="mt-[18.5px]">
          {CS_MENU_ITEMS.map(item => (
            <MenuItem
              key={item.label}
              label={item.label}
              onClick={() => router.push(item.path)}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default CustomerServicePage;
