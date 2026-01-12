"use client";

import { useEffect, useRef, useState } from "react";

interface NameInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PLACEHOLDER = "이름을 입력해주세요";
const INITIAL_WIDTH = 204;

export const NameInput = ({ value, onChange }: NameInputProps) => {
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
        {value || PLACEHOLDER}
      </span>

      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={PLACEHOLDER}
        style={{ width: inputWidth }}
        className="border-mint-01 text-d3 text-neutral-01 placeholder:text-neutral-07 rounded-2xl border px-4 py-2 text-center transition-[width] duration-150 ease-out outline-none"
      />
    </div>
  );
};
