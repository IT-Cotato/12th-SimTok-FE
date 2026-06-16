import { apiInstance } from "../apiInstance";

export const logout = async () => {
  const { data } = await apiInstance.post("/auth/logout");
  return data;
};

export const deleteAccount = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("refreshToken이 없어 회원탈퇴를 진행할 수 없습니다.");
  }
  const { data } = await apiInstance.delete("/member/me", {
    data: { refreshToken },
  });
  return data;
};
