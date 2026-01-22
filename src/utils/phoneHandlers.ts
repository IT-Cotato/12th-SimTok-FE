export const phoneChangeHandler = (setPhone: (val: string) => void) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const rawValue = value.replace(/\D/g, "");

    if (rawValue.length > 11) return;

    const validStart = "010";
    if (
      rawValue.length > 0 &&
      !validStart.startsWith(rawValue.slice(0, Math.min(rawValue.length, 3)))
    ) {
      return;
    }

    setPhone(rawValue);
  };
};
