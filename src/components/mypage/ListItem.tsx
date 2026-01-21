"use client";

import Link from "next/link";

import React, { useState } from "react";

import { Toggle } from "@/components/common/Toggle";

interface ListItemProps {
  label: string;
  href?: string;
  onClick?: () => void;
  hasToggle?: boolean;
  toggleOnChange?: (value: boolean) => void;
  toggleDefaultOn?: boolean;
  Icon?: React.ElementType;
  hoverBg?: boolean;
}

export const ListItem = ({
  label,
  href,
  onClick,
  hasToggle = false,
  toggleOnChange,
  toggleDefaultOn = false,
  Icon,
  hoverBg = false,
}: ListItemProps) => {
  const [isOn, setIsOn] = useState(toggleDefaultOn);
  const isClickable = Boolean(onClick || href || hasToggle);

  const handleToggleAction = () => {
    const nextValue = !isOn;
    setIsOn(nextValue);
    toggleOnChange?.(nextValue);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hasToggle) {
      handleToggleAction();
    }
    onClick?.();
  };

  const commonClasses = `flex flex-1 items-center justify-between w-full px-4 py-5 transition-colors text-left
    ${isClickable ? "hover:bg-neutral-10 active:bg-neutral-09 cursor-pointer" : "cursor-default"}`;

  const renderInnerContent = () => (
    <>
      <div className="flex items-center gap-2.5">
        {Icon && <Icon className="h-6 w-6" />}
        <span className="text-neutral-03 text-sub0-sb">{label}</span>
      </div>
      {hasToggle && (
        <div className="flex items-center">
          <Toggle on={isOn} onChange={handleToggleAction} />
        </div>
      )}
    </>
  );
  return (
    <div className="flex w-full items-center justify-between transition-colors">
      {href ? (
        <Link href={href} className={commonClasses}>
          {renderInnerContent()}
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          disabled={!isClickable}
          className={commonClasses}
        >
          {renderInnerContent()}
        </button>
      )}
    </div>
  );
};
