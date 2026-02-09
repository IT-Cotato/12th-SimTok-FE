import { cookies } from "next/headers";

export async function refreshAccessToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) return null;

  const res = await fetch("https://43.202.184.232.nip.io/api/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  const result = await res.json();
  if (result.success) {
    const newToken = result.data.accessToken;
    cookieStore.set("accessToken", newToken, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
    return newToken;
  }
  return null;
}
