import { cookies } from "next/headers";

import { BACKEND_BASE_URL } from "@/lib/constants";

export async function refreshAccessToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) return null;

  const res = await fetch(`${BACKEND_BASE_URL}/api/auth/refresh`, {
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
