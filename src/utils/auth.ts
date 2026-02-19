export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (
    !refreshToken ||
    refreshToken === "undefined" ||
    refreshToken === "null"
  ) {
    console.error("리프레시 토큰이 로컬스토리지에 없음");
    return null;
  }

  try {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await response.json();

    if (result.success && result.data?.accessToken) {
      const newToken = result.data.accessToken;
      localStorage.setItem("accessToken", newToken);
      return newToken;
    }

    console.error(
      "[Step 3] 재발급 조건 미충족 (success false 또는 데이터 없음)",
    );
    return null;
  } catch (error) {
    console.error("Refresh Error:", error);
    return null;
  }
};
