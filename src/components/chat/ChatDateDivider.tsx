import DateIcon from "@/assets/date.svg";

interface ChatDateDividerProps {
  date: string;
}

export const ChatDateDivider = ({ date }: ChatDateDividerProps) => {
  return (
    <div className="mb-12 flex justify-center px-[10px] py-[10px]">
      <div className="bg-neutral-10 flex h-[30px] items-center gap-1 rounded-2xl px-4">
        <DateIcon className="text-neutral-05 h-4 w-4" />
        <span className="text-sub2-r text-neutral-05">{date}</span>
      </div>
    </div>
  );
};
