type Props = {
  total: number;
  current: number;
};

export default function ProgressDots({ total, current }: Props) {
  return (
    <div className="flex w-full items-center justify-center py-2.5">
      <div className="flex gap-[9px]">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i <= current;

          return (
            <span
              key={i}
              className={
                isActive
                  ? "bg-mint-01 h-2.5 w-2.5 rounded-full"
                  : "bg-neutral-08 h-2.5 w-2.5 rounded-full"
              }
            />
          );
        })}
      </div>
    </div>
  );
}
