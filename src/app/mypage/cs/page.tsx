"use client";
import { useRouter } from "next/navigation";

import { BackHeader } from "@/components/common/BackHeader";
import { ListItem } from "@/components/mypage/ListItem";

import { CS_MENU_ITEMS } from "@/constants/cs";

const CustomerServicePage = () => {
  const router = useRouter();
  return (
    <main className="flex min-h-dvh w-full justify-center">
      <div className="flex h-full w-110 flex-col">
        <BackHeader title="고객센터" />
        <ul className="mt-[43.5px] flex flex-col">
          {CS_MENU_ITEMS.map(item => (
            <li key={item.label}>
              <ListItem
                label={item.label}
                onClick={() => router.push(item.path)}
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default CustomerServicePage;
