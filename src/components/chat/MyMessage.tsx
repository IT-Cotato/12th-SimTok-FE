interface MyMessageProps {
  content: string;
  time: string;
}

export const MyMessage = ({ content, time }: MyMessageProps) => {
  return (
    <div className="flex w-full justify-end px-4 py-[10px]">
      <div className="flex items-end gap-1">
        <span className="text-sub2-r text-neutral-06">{time}</span>
        <div className="bg-green-02 max-w-[240px] rounded-2xl px-4 py-2">
          <p className="text-sub1-r break-all text-white">{content}</p>
        </div>
      </div>
    </div>
  );
};
