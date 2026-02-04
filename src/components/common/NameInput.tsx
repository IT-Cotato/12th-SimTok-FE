"use client";

import { useEffect, useRef, useState } from "react";

interface NameInputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder: string;
  changeable?: boolean;
}

const INITIAL_WIDTH = 204;

export const NameInput = ({
  value,
  onChange,
  placeholder,
  changeable = false,
}: NameInputProps) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState<number>(INITIAL_WIDTH);

  useEffect(() => {
    if (!spanRef.current) return;

    const spanWidth = spanRef.current.offsetWidth;
    setInputWidth(spanWidth + 36);
  }, [value]);

  return (
    <div className="flex justify-center">
      <span ref={spanRef} className="text-d3 invisible absolute whitespace-pre">
        {value || placeholder}
      </span>

      {changeable ? (
        <input
          type="text"
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          style={{ width: inputWidth }}
          className="border-mint-01 text-d3 text-neutral-01 placeholder:text-neutral-07 rounded-2xl border px-4 py-2 text-center transition-[width] duration-150 ease-out outline-none"
        />
      ) : (
        <span className="border-mint-01 text-d3 text-neutral-01 rounded-2xl border px-4 py-2 text-center">
          {value}
        </span>
      )}
    </div>
  );
};
