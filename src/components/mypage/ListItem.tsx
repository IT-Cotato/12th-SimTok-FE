"use client";

import React from "react";

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
    <div className="flex w-full items-center justify-between transition-colors">
      <button
        type="button"
        onClick={onClick}
        disabled={!isClickable}
        className={`flex flex-1 items-center gap-2.5 px-4 py-5 transition-colors ${isClickable ? "hover:bg-neutral-10 active:bg-neutral-09 cursor-pointer" : "cursor-default"} `}
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
