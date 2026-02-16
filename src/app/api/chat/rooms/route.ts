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
    const limit = searchParams.get("limit") || "10";
    const cursorAt = searchParams.get("cursorAt");
    const cursorRoomId = searchParams.get("cursorRoomId");

    let backendUrl = `${BACKEND_BASE_URL}/chat/rooms?limit=${limit}`;

    if (cursorAt && cursorRoomId) {
      backendUrl += `&cursorAt=${encodeURIComponent(cursorAt)}&cursorRoomId=${cursorRoomId}`;
    }

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "백엔드 응답 오류" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Route Handler 상세 에러:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
