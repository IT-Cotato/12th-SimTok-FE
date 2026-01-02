import SharedDiaryData from "@/mock/sharedDiary.json";

import { Diary } from "@/types/diary.type";

import { SharedDiaryItem } from "./ShareDiaryItem";

const SharedDiary = SharedDiaryData as Diary[];

export const SharedDiaryCard = () => {
  return (
    <div className="flex flex-col gap-4">
      {SharedDiary.map(item => (
        <SharedDiaryItem key={item.id} item={item} />
      ))}
    </div>
  );
};
