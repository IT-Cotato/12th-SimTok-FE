"use client";

import { useMemo } from "react";

const isValidPhoneNumber = (value: string) => {
  if (value.length !== 11) return false;

  if (!/^\d+$/.test(value)) return false;

  return value.startsWith("010");
};

export const usePhoneValidation = (phone: string) => {
  const isValid = useMemo(() => isValidPhoneNumber(phone), [phone]);

  return { isValidPhone: isValid, isValidPhoneNumber };
};
