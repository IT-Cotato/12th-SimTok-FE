"use client";

import { useRouter } from "next/navigation";

import { BackHeader } from "@/components/common/BackHeader";
import { NavBar } from "@/components/common/NavBar";
import { NotiItem } from "@/components/noti/NotiItem";
import { NotiSection } from "@/components/noti/NotiSection";
import { RequestWidget } from "@/components/noti/RequestWidget";

import notiList from "@/mock/notiList.json";

type NotiListItem = (typeof notiList)[number];

const SECTIONS = ["정원", "하루기록"] as const;

const NotiPage = () => {
  const router = useRouter();

  return (
    <main className="flex min-h-dvh w-full flex-col">
      <div className="flex flex-1 justify-center">
        <div className="mt-[13px] flex h-full w-110 flex-col pb-30">
          <BackHeader title="알림" />
          <section className="mt-[18.5px]">
            <RequestWidget
              onClick={() => router.push("/notification/friend-requests")}
            />
          </section>
          {SECTIONS.map(section => (
            <NotiSection key={section} title={section}>
              {notiList
                .filter((item: NotiListItem) => item.section === section)
                .map((item: NotiListItem) => (
                  <NotiItem
                    key={item.id}
                    imgUrl={item.imgUrl}
                    content={item.content}
                    timeText={item.timeText}
                  />
                ))}
            </NotiSection>
          ))}
        </div>
      </div>
      <NavBar />
    </main>
  );
};

export default NotiPage;
