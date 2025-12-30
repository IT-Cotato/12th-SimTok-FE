export const formatBirthInput = (value: string) => {
  const v = value.replace(/\D/g, "").slice(0, 8);

  if (v.length >= 6) {
    return `${v.slice(0, 4)}/${v.slice(4, 6)}/${v.slice(6)}`;
  }
  if (v.length >= 4) {
    return `${v.slice(0, 4)}/${v.slice(4)}`;
  }
  return v;
};
