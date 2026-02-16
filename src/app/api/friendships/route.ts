import { NextResponse } from "next/server";

import { BACKEND_BASE_URL } from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = request.headers.get("Authorization");

  try {
    const targetUrl = `${BACKEND_BASE_URL}/friendships?${searchParams.toString()}`;

    const res = await fetch(targetUrl.toString(), {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("🔥 Route Handler 에러:", error);
    return NextResponse.json(
      { success: false, message: "서버 연결 실패" },
      { status: 500 },
    );
  }
}
