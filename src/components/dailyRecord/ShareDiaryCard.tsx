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
            <div className="flex justify-center gap-[5px] px-4 py-[10px]">
              <Image
                src={item.profile}
                alt={item.userName}
                width={46}
                height={46}
              />
              <p>{item.userName}</p>
            </div>
            {emotionMeta && (
              <h3 className="flex flex-col items-center gap-[-16px]">
                <Image
                  src={emotionMeta.imageSrc}
                  alt={item.emotion}
                  width={69}
                  height={69}
                  className="p-[10px]"
                />
                <p className="text-sub1-sb text-black">
                  {emotionMeta.pastText}
                </p>
              </h3>
            )}
          </section>
        );
      })}
    </div>
  );
};
