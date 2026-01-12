interface ProgressDotsProps {
  total: number;
  current: number;
}

export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex w-full items-center justify-center px-4 py-[10px]">
      <div className="flex gap-[9px]">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i <= current;

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
}
