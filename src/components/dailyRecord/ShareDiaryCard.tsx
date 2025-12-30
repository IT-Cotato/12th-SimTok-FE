import Image from "next/image";

import ShareDiaryData from "@/mock/sharedDiary.json";

import { getEmotionMeta } from "@/utils/getEmotionMeta";

export const SharedDiaryCard = () => {
  return (
    <div>
      {ShareDiaryData.map(item => {
        const emotionMeta = getEmotionMeta(item.emotion);
        return (
          <section key={item.id} className="flex flex-col">
            <div className="flex items-center justify-start gap-[5px] px-4 py-[10px]">
              <Image
                src={item.profile}
                alt={item.userName}
                width={46}
                height={46}
                className="rounded-full object-cover"
              />
              <p>{item.userName}</p>
            </div>
            {emotionMeta && (
              <h3 className="-mt-[32px] flex flex-col items-center">
                <Image
                  src={emotionMeta.imageSrc}
                  alt={item.emotion}
                  width={89}
                  height={89}
                  className="p-[10px]"
                />
                <p className="text-sub1-sb -mt-[16px] text-black">
                  {`"오늘 하루는 ${emotionMeta.pastText}"`}
                </p>
              </h3>
            )}
          </section>
        );
      })}
    </div>
  );
};
