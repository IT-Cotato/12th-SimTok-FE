import { useState } from "react";

import CodeIcon from "@/assets/code.svg";

interface InputFieldProps {
  onChangeInputText: (value: string) => void;
}

export const InputField = ({ onChangeInputText }: InputFieldProps) => {
  const [isClick, setIsClick] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const isActive = isClick || inputValue !== "";
  return (
    <div
      className={`${isActive ? "border-mint-01 border bg-white" : "border-neutral-08 bg-neutral-11 border"} relative flex w-full items-center rounded-2xl px-4 py-2`}
      onClick={() => setIsClick(true)}
    >
      <div className="flex flex-1 items-center gap-[10px] pr-8">
        <CodeIcon
          className={`${isActive ? "text-mint-01" : "text-neutral-07"} h-7 w-7`}
        />
        <input
          type="text"
          placeholder="친구초대코드를 입력해주세요"
          className="text-h2 text-neutral-01 w-full focus:outline-none"
          onFocus={() => setIsClick(true)}
          onBlur={() => setIsClick(false)}
          onChange={e => {
            onChangeInputText(e.target.value);
            setInputValue(e.target.value);
          }}
        ></input>
      </div>
    </div>
  );
};
