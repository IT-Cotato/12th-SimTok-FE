import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { BACKEND_BASE_URL } from "@/lib/constants";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
      console.error("❌ API Route: Access Token 누락됨");
      return NextResponse.json(
        { message: "인증 토큰이 없습니다." },
        { status: 401 },
      );
    }
    const resolvedParams = await params;
    const roomId = resolvedParams.id;

    const { searchParams } = request.nextUrl;
    const limit = searchParams.get("limit") || "20";
    const cursorSeq = searchParams.get("cursorSeq");

    let url = `${BACKEND_BASE_URL}/chat/rooms/${roomId}/messages?limit=${limit}`;

    if (cursorSeq) url += `&cursorSeq=${cursorSeq}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // 헤더 명시적 추가
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`❌ Backend Error (${response.status}):`, errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
