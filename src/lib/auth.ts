import { cookies } from "next/headers";

export async function refreshAccessToken() {
  const cookieStore = await cookies();
  const res = await fetch("https://43.202.184.232.nip.io/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const result = await res.json();
  if (result.success) {
    const newToken = result.data.accessToken;
    cookieStore.set("accessToken", newToken, { path: "/", httpOnly: true });
    return newToken;
  }
  return null;
}
