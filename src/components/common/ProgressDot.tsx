interface progressDotsProps {
  total: number;
  current: number;
}

export const ProgressDots = ({ total, current }: progressDotsProps) => {
  return (
    <div className="z-10 flex w-full items-center justify-center px-4 py-[10px]">
      <div className="flex gap-[9px]">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i <= current - 1;

          return (
            <span
              key={i}
              className={`${isActive ? "bg-mint-01" : "bg-neutral-08"} h-3 w-3 rounded-full`}
            />
          );
        })}
      </div>
    </div>
  );
};
