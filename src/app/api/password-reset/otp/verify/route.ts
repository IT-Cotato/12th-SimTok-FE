import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BACKEND_URL =
    "https://43.202.184.232.nip.io/api/password-reset/otp/verify";
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
