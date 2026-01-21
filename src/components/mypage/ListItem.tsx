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
  hoverBg?: boolean;
}

export const ListItem = ({
  label,
  onClick,
  hasToggle = false,
  toggleOnChange,
  toggleDefaultOn = false,
  Icon,
  hoverBg = false,
}: ListItemProps) => {
  const isClickable = Boolean(onClick);
  return (
    <div className="flex w-full items-center justify-between">
      <button
        type="button"
        onClick={onClick}
        disabled={!isClickable}
        aria-disabled={!isClickable}
        className={`flex flex-1 items-center gap-2.5 px-4 ${isClickable ? "cursor-pointer" : "cursor-default"} ${hoverBg && "hover:bg-neutral-10"} px-4 py-5`}
      >
        {Icon && <Icon className="h-6 w-6" />}
        <span className="text-neutral-03 text-sub0-sb">{label}</span>
      </button>
      {hasToggle && (
        <div className="flex items-center">
          <Toggle defaultOn={toggleDefaultOn} onChange={toggleOnChange} />
        </div>
      )}
    </div>
  );
};
