import { NextResponse } from "next/server";

import { BACKEND_BASE_URL } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const draftKey = req.headers.get("Signup-Draft-Key") || "";

    const res = await fetch(`${BACKEND_BASE_URL}/api/signup/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Signup-Draft-Key": draftKey,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Profile Proxy Error:", error);
    return NextResponse.json(
      { success: false, message: "서버 연결 실패" },
      { status: 500 },
    );
  }
}
