import { GalleryAssets } from "@/assets/GalleryIcon";

import { InfoMessage } from "../dailyRecord/InfoMessage";

export const WriteStepButton = () => {
  return (
    <section className="flex flex-col gap-[7.8px]">
      <div className="px-4">
        <InfoMessage
          text="사진과 글을 추가해서 일기를 꾸며보세요!"
          triangleUp={false}
        />
      </div>
      <div className="flex justify-between px-4">
        <button className="bg-neutral-11 border-mint-01 h-[95px] max-w-[196px] flex-1 cursor-pointer rounded-2xl border border-solid px-[10px] py-[10px] pt-[20px]">
          <div className="inline-flex items-center justify-center rounded-2xl bg-white p-[10px]">
            <GalleryAssets />
          </div>
          <p>사진추가하기</p>
        </button>
        <button className="bg-neutral-11 border-mint-01 h-[95px] max-w-[196px] flex-1 cursor-pointer rounded-2xl border border-solid px-[10px] py-[10px] pt-[20px]">
          <div className="text-sub2-sb inline-flex items-center justify-center rounded-2xl bg-white p-[10px] text-black">
            TEXT
          </div>
          <p>글쓰기</p>
        </button>
      </div>
    </section>
  );
};
