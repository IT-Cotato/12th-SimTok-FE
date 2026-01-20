export const phoneChangeHandler = (setPhone: (val: string) => void) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const rawValue = value.replace(/\D/g, "");

    if (rawValue.length > 0 && !rawValue.startsWith("010")) return;

    setPhone(rawValue);
  };
};
