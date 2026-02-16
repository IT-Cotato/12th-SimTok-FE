import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { BACKEND_BASE_URL } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "인증 토큰 부재" }, { status: 401 });
    }

    const { searchParams } = request.nextUrl;
    const opponentMemberId = searchParams.get("opponentMemberId");

    if (!opponentMemberId) {
      return NextResponse.json(
        { message: "상대방 ID가 필요합니다." },
        { status: 400 },
      );
    }

    // 백엔드 서버로 요청 전달
    const response = await fetch(
      `${BACKEND_BASE_URL}/api/chat/rooms/direct/resolve?opponentMemberId=${opponentMemberId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Resolve API Proxy Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
