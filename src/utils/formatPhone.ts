export const formatPhone = (value: string): string => {
  const onlyNumber = value.replace(/\D/g, "").slice(0, 11);

  if (onlyNumber.length <= 3) return onlyNumber;

  // 010-1234 형태
  if (onlyNumber.length <= 7) {
    return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3)}`;
  }

  // 010-1234-5678 형태 (11자리 고정 포맷)
  return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3, 7)}-${onlyNumber.slice(7)}`;
};
