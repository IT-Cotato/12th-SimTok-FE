import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BACKEND_URL = "https://43.202.184.232.nip.io/api/password-reset/drafts";

  try {
    const body = await request.json();
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    const draftKey = res.headers.get("Password-Reset-Draft-Key");

    const nextResponse = NextResponse.json(data);
    if (draftKey) {
      nextResponse.headers.set("Password-Reset-Draft-Key", draftKey);
    }

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "서버 연결 실패" },
      { status: 500 },
    );
  }
}
