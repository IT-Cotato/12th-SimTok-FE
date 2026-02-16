interface RecognitionInputProps {
  value: string;
}

export const RecognitionInput = ({ value }: RecognitionInputProps) => {
  return (
    <div className="w-full px-4">
      <div className="border-primary-green flex h-[59px] w-full items-center rounded-[18px] border-[1.5px] bg-white px-5 shadow-sm">
        <input
          type="text"
          value={value}
          readOnly
          className="text-sub1-r text-neutral-01 w-full outline-none"
          placeholder="인식된 내용이 여기에 표시됩니다"
        />
      </div>
    </div>
  );
};
