import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { BACKEND_BASE_URL } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get("accessToken")?.value;
    const headerToken = request.headers
      .get("Authorization")
      ?.replace("Bearer ", "");
    const token = cookieToken || headerToken;

    console.log(
      `[chat/rooms] 요청 - cookie토큰: ${cookieToken ? "있음" : "없음"}, header토큰: ${headerToken ? "있음" : "없음"}`,
    );

    if (!token) {
      return NextResponse.json({ message: "인증 토큰 부재" }, { status: 401 });
    }

    const { searchParams } = request.nextUrl;
    const limit = searchParams.get("limit") || "10";
    const cursorAt = searchParams.get("cursorAt");
    const cursorRoomId = searchParams.get("cursorRoomId");

    let backendUrl = `${BACKEND_BASE_URL}/chat/rooms?limit=${limit}`;
    console.log(`[chat/rooms] 백엔드 요청 URL: ${backendUrl}`);

    if (cursorAt && cursorRoomId) {
      backendUrl += `&cursorAt=${encodeURIComponent(cursorAt)}&cursorRoomId=${cursorRoomId}`;
    }

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error(
        `[chat/rooms] 백엔드 오류 - URL: ${backendUrl}, Status: ${response.status}, Body: ${errorBody}`,
      );
      return NextResponse.json(
        { message: "백엔드 응답 오류", status: response.status },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Route Handler 상세 에러:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
