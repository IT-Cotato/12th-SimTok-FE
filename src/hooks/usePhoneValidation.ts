"use client";

import { useMemo } from "react";

const isValidPhoneNumber = (value: string) => {
  // 10~11자리 숫자
  if (!/^\d{10,11}$/.test(value)) return false;

  const prefix = value.slice(0, 3);
  // 010~019
  return /^01[0-9]$/.test(prefix);
};

export const usePhoneValidation = (phone: string) => {
  const isValid = useMemo(() => isValidPhoneNumber(phone), [phone]);

  return { isValidPhone: isValid, isValidPhoneNumber };
};
