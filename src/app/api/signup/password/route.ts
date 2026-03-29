import { NextResponse } from "next/server";

import { BACKEND_BASE_URL } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const draftKey = req.headers.get("Signup-Draft-Key") || "";

    const res = await fetch(`${BACKEND_BASE_URL}/signup/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Signup-Draft-Key": draftKey,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    const response = NextResponse.json(data, { status: res.status });

    if (data.success) {
      const accessToken = data.data?.tokens?.accessToken?.accessToken;
      const refreshToken = data.data?.tokens?.refreshToken?.refreshToken;

      if (accessToken) {
        response.cookies.set("accessToken", accessToken, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24,
        });
      }

      if (refreshToken) {
        response.cookies.set("refreshToken", refreshToken, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 14,
        });
      }
    }

    return response;
  } catch (error) {
    console.error("Password Proxy Error:", error);
    return NextResponse.json(
      { success: false, message: "서버 연결 실패" },
      { status: 500 },
    );
  }
}
