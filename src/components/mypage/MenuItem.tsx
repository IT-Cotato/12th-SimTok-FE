"use client";

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

export const MenuItem = ({ label, onClick }: MenuItemProps) => (
  <button
    type="button"
    className="border-neutral-10 text-h2 text-neutral-04 flex h-[71px] w-full cursor-pointer items-center border-b py-5"
    onClick={onClick}
  >
    {label}
  </button>
);
