import { AccessToken, AuthToken } from "@/types/auth.type";

import { apiInstance } from "../apiInstance";

export const login = async (
  phoneNumber: string,
  password: string,
): Promise<AuthToken> => {
  const { data } = await apiInstance.post("/auth/login", {
    phoneNumber,
    password,
  });
  return data.data;
};

export const postRefresh = async (): Promise<AccessToken> => {
  const { data } = await apiInstance("/auth/refresh");
  return data.data;
};
