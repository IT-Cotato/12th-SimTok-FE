export const phoneChangeHandler =
  (setPhone: (value: string) => void) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const onlyNumber = raw.replace(/\D/g, "");
    setPhone(onlyNumber);
  };
