import { NextResponse } from "next/server";

import { BACKEND_BASE_URL } from "@/lib/constants";

export async function POST(req: Request) {
  const BACKEND_URL = `${BACKEND_BASE_URL}/api/auth/refresh`;

  try {
    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token provided" },
        { status: 400 },
      );
    }

    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: "Token refresh failed" },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("Refresh API Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
