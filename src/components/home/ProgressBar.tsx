interface ProgressBarProps {
  percentage: number;
  haveTodayChat: boolean;
}
export const ProgressBar = ({
  percentage,
  haveTodayChat,
}: ProgressBarProps) => {
  return (
    <div className="bg-neutral-08 flex h-2 w-full rounded-sm">
      <div
        className={`${haveTodayChat ? "bg-mint-02" : "bg-orange-01"} rounded-s-sm`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
