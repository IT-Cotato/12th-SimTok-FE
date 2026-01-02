export const formatPhone = (value: string): string => {
  const onlyNumber = value.replace(/\D/g, "");

  if (onlyNumber.length < 4) return onlyNumber;

  // 010-123
  if (onlyNumber.length < 7) {
    return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3)}`;
  }

  // 10자리: 010-123-4567
  if (onlyNumber.length === 10) {
    return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3, 6)}-${onlyNumber.slice(6)}`;
  }

  // 11자리: 010-1234-5678
  return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3, 7)}-${onlyNumber.slice(7, 11)}`;
};
