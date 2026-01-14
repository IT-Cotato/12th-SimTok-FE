import Image from "next/image";

import chatProgressData from "@/mock/chatProgress.json";

import { getPercentage } from "@/utils/getPercentage";

import { ProgressBar } from "./ProgressBar";

export const ChatProgress = () => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center px-4">
        <p className="text-h1 text-neutral-01">
          이번주에 대화를 이만큼 나눴어요 👀
        </p>
      </div>
      <div className="px-4 py-[10px]">
        {chatProgressData.map(data => {
          const chatPercentage = getPercentage(data.totalDays, data.goalDays);
          return (
            <div className="flex gap-[15px] py-[10px]" key={data.userId}>
              <Image
                src={data.profileImg}
                alt={data.userName}
                width={72}
                height={72}
                className="h-18 w-18 rounded-2xl object-cover"
              />

              <div className="flex flex-1 flex-col gap-[6px]">
                <div className="flex items-center justify-between">
                  <div className="text-d3 text-neutral-01">{data.userName}</div>
                  <div className="flex gap-[2px]">
                    <div className="flex">
                      <p className="text-h3 text-neutral-05">
                        {data.totalDays}
                      </p>
                      <p className="text-h3 text-neutral-07">일</p>
                    </div>
                    <p className="text-h3 text-neutral-07">/</p>
                    <p className="text-h3 text-neutral-07">{data.goalDays}일</p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="text-h3 text-neutral-06">
                    {data.hasTodayChat
                      ? "오늘은 이미 대화를 나눴어요 👍"
                      : "오늘의 안부를 나눠보세요!"}
                  </div>
                  <ProgressBar
                    percentage={chatPercentage}
                    haveTodayChat={data.hasTodayChat}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
