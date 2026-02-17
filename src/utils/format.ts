export const formatPhone = (value: string): string => {
  const onlyNumber = value.replace(/\D/g, "").slice(0, 11);
  if (onlyNumber.length <= 3) return onlyNumber;
  if (onlyNumber.length <= 7) {
    return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3)}`;
  }
  return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3, 7)}-${onlyNumber.slice(7)}`;
};

export const formatDateWithSlash = (dateStr: string): string => {
  const onlyNumber = dateStr.replace(/\D/g, "");
  if (onlyNumber.length !== 8) return dateStr; // 8자리가 아니면 원본 반환

  return onlyNumber.replace(/(\d{4})(\d{2})(\d{2})/, "$1/$2/$3");
};
