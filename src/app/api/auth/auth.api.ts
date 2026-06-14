import { apiInstance } from "../apiInstance";

export const logout = async () => {
  const { data } = await apiInstance.post("/auth/logout");
  return data;
};
