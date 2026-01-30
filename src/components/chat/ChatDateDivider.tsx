export const ChatDateDivider = ({ date }: { date: string }) => {
  return (
    <div className="my-4 flex justify-center">
      <div className="bg-neutral-10 flex items-center gap-1 rounded-2xl px-4">
        <span className="text-sub2-r text-neutral-05">📅 {date}</span>
      </div>
    </div>
  );
};
