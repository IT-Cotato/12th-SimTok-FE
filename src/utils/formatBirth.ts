export const formatBirthInput = (raw: string): string => {
  if (!raw) return "";

  const onlyDigits = raw.replace(/\D/g, "").slice(0, 8);
  const len = onlyDigits.length;

  const year = onlyDigits.slice(0, 4);
  const month = onlyDigits.slice(4, 6);
  const day = onlyDigits.slice(6, 8);

  if (len >= 4) {
    const y = Number(year);
    if (y < 1900 || y > 2025) {
      const prev = onlyDigits.slice(0, 3);       
      return formatBirthInput(prev);
    }
  }

  if (len >= 6) {
    const m = Number(month);
    if (m < 1 || m > 12) {
      const prev = onlyDigits.slice(0, 5);
      return formatBirthInput(prev);
    }
  }

  if (len === 8) {
    const d = Number(day);
    if (d < 1 || d > 31) {
      const prev = onlyDigits.slice(0, 7);
      return formatBirthInput(prev);
    }
  }

  if (len <= 4) return year;
  if (len <= 6) return `${year}/${onlyDigits.slice(4)}`;
  return `${year}/${month}/${day}`;
};

export const isValidBirth = (birth: string): boolean => {
  const digits = birth.replace(/\D/g, "");
  if (digits.length !== 8) return false;

  const year = Number(digits.slice(0, 4));
  const month = Number(digits.slice(4, 6));
  const day = Number(digits.slice(6, 8));

  if (year < 1900 || year > 2025) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  return true;
};
