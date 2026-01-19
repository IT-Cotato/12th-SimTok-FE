"use client";

import { ReactNode } from "react";

import { Toggle } from "@/components/common/Toggle";

interface ListItemProps {
  label: string;
  onClick?: () => void;
  hasToggle?: boolean;
  toggleOnChange?: (value: boolean) => void;
  toggleDefaultOn?: boolean;
  Icon?: React.ElementType;
}

export const ListItem = ({
  label,
  onClick,
  hasToggle = false,
  toggleOnChange,
  toggleDefaultOn = false,
  Icon,
}: ListItemProps) => (
  <div className="text-sub0-sb text-neutral-03 flex h-8 w-full items-center justify-between">
    <button
      type="button"
      className="flex flex-1 cursor-pointer items-center gap-2.5 px-4"
      onClick={onClick}
    >
      {Icon && <Icon className="h-6 w-6" />}
      <span>{label}</span>
    </button>
    {hasToggle && (
      <div className="flex items-center">
        <Toggle defaultOn={toggleDefaultOn} onChange={toggleOnChange} />
      </div>
    )}
  </div>
);
