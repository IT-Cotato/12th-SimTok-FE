import { NextResponse } from "next/server";

import { BACKEND_BASE_URL } from "@/lib/constants";

export async function POST(request: Request) {
  const BACKEND_URL = `${BACKEND_BASE_URL}/password-reset/password`;
  const draftKey = request.headers.get("Password-Reset-Draft-Key") || "";

  try {
    const body = await request.json();
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Password-Reset-Draft-Key": draftKey,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "서버 연결 실패" },
      { status: 500 },
    );
  }
}
