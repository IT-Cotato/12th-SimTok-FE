"use client";

import { Toggle } from "@/components/common/Toggle";

interface AlarmItemProps {
  label: string;
  onChange?: (value: boolean) => void;
}

export const AlarmItem = ({ label, onChange }: AlarmItemProps) => (
  <div className="text-sub0-sb text-neutral-03 flex h-8 w-full items-center justify-between">
    <span>{label}</span>
    <div className="flex items-center">
      <Toggle defaultOn onChange={onChange} />
    </div>
  </div>
);
