import { apiInstance } from "../apiInstance";

export const logout = async () => {
  const { data } = await apiInstance.post("/auth/logout");
  return data;
};

export const deleteAccount = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const { data } = await apiInstance.delete("/member/me", {
    data: { refreshToken },
  });
  return data;
};
