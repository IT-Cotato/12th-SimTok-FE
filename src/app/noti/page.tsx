"use client";

import { useRouter } from "next/navigation";

import { BackHeader } from "@/components/common/BackHeader";
import { NavBar } from "@/components/common/NavBar";
import { NotiItem } from "@/components/noti/NotiItem";
import { NotiSection } from "@/components/noti/NotiSection";
import { RequestWidget } from "@/components/noti/RequestWidget";

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
          <NotiSection title="정원">
            <NotiItem
              imgUrl="/images/sample-cat.png"
              content="남궁돈님이 초대장을 보냈어요."
              timeText="1초"
            />
            <NotiItem
              imgUrl="/images/sample-cat2.png"
              content="🌱믿음소망🌱에 물이 필요해요!"
              timeText="10분"
            />
            <NotiItem
              imgUrl="/images/sample-dog.png"
              content="박혜미님이 초대장을 수락했어요."
              timeText="40분"
            />
          </NotiSection>
          <NotiSection title="하루기록">
            <NotiItem
              imgUrl="/images/sample-cat.png"
              content="남궁돈님이 초대장을 보냈어요."
              timeText="1초"
            />
            <NotiItem
              imgUrl="/images/sample-cat2.png"
              content="🌱믿음소망🌱에 물이 필요해요!"
              timeText="10분"
            />
          </NotiSection>
        </div>
      </div>
      <NavBar />
    </main>
  );
};

export default NotiPage;
