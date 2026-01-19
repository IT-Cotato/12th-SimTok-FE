interface InfoRowProps {
  Icon: React.ElementType;
  value: string;
}

export const InfoRow = ({ Icon, value }: InfoRowProps) => (
  <div className="bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl px-4">
    <div className="pr-2.5">
      <Icon />
    </div>
    <span className="text-h2 text-neutral-03">{value}</span>
  </div>
);
