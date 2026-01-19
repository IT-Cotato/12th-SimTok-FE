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
      className={`relative flex h-6 w-11 items-center rounded-full border border-transparent transition-colors ${on ? "bg-green-500" : "bg-neutral-06"}`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-1"}`}
      />
    </button>
  );
};
