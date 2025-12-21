// src/utils/formatPhone.ts
export const formatPhone = (value: string): string => {
  const onlyNumber = value.replace(/\D/g, ""); // 숫자만 남기기

  if (onlyNumber.length < 4) return onlyNumber;
  if (onlyNumber.length < 8) {
    return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3)}`; // 010-123
  }
  return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3, 7)}-${onlyNumber.slice(7, 11)}`; // 010-1234-5678
};
