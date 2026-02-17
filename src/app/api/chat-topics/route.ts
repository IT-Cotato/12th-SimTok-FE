import { NextRequest, NextResponse } from "next/server";

import { BACKEND_BASE_URL } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    const res = await fetch(`${BACKEND_BASE_URL}/chat-topics`, {
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "주제 목록을 가져오는데 실패했습니다." },
        { status: res.status },
      );
    }

    const data = await res.json();
    console.log("--- Backend Raw Data ---", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat Topics Proxy Error:", error);
    return NextResponse.json(
      { error: "서버 연결 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
