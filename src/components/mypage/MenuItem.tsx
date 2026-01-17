"use client";

import { ReactNode } from "react";

interface MenuItemProps {
  label: string;
  onClick: () => void;
  Icon?: React.ElementType;
}

export const MenuItem = ({ label, onClick, Icon }: MenuItemProps) => (
  <button
    type="button"
    className="text-sub0-sb text-neutral-03 flex h-8 w-full cursor-pointer items-center gap-2.5 px-4"
    onClick={onClick}
  >
    {Icon && <Icon className="h-6 w-6" />} {/* 아이콘 렌더링 */}
    <span>{label}</span>
  </button>
);
