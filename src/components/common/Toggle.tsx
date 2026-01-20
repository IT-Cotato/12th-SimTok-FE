"use client";

import { useState } from "react";

interface ToggleProps {
  defaultOn?: boolean;
  onChange?: (value: boolean) => void;
}

export const Toggle = ({ defaultOn = true, onChange }: ToggleProps) => {
  const [on, setOn] = useState(defaultOn);

  const handleClick = () => {
    const next = !on;
    setOn(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative flex h-[31px] w-[51px] items-center rounded-full border border-transparent transition-colors ${on ? "bg-mint-01" : "bg-neutral-06"}`}
    >
      <span
        className={`relative mx-[2px] h-[27px] w-[27px] rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0"} `}
      />
    </button>
  );
};
