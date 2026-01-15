"use client";

import { Toggle } from "@/components/common/Toggle";

interface AlarmItemProps {
  label: string;
  onChange?: (value: boolean) => void;
}

export const AlarmItem = ({ label, onChange }: AlarmItemProps) => (
  <div className="border-neutral-10 text-h2 text-neutral-04 flex h-[71px] w-full items-center justify-between border-b py-5">
    <span>{label}</span>
    <div className="flex items-center">
      <Toggle defaultOn onChange={onChange} />
    </div>
  </div>
);
