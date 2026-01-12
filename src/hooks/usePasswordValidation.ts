export const usePasswordValidation = () => {
  // const isValidPassword = (pwd: string) => {
  //   const hasLetter = /[A-Za-z]/.test(pwd);
  //   const hasNumber = /\d/.test(pwd);
  //   const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
  //   return pwd.length >= 8 && hasLetter && hasNumber && hasSpecial;
  const isValidPassword = (pwd: string) => {
    return pwd.length >= 8;
  };

  const getState = (value: string, isValid: boolean) => {
    if (value.length === 0) return "empty";
    if (isValid) return "valid";
    return "invalid";
  };

  const getBorderColor = (state: string) =>
    state === "valid"
      ? "border-mint-01"
      : state === "invalid"
        ? "border-orange-00"
        : "border-neutral-08";

  const getTextColor = (state: string) =>
    state === "invalid" ? "text-orange-00" : "text-neutral-07";

  return {
    isValidPassword,
    getState,
    getBorderColor,
    getTextColor,
  };
};
