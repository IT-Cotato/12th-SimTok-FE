import { NextResponse } from "next/server";

import { BACKEND_BASE_URL } from "@/lib/constants";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ roomId: string }> },
) {
  const { roomId } = await params;

  const token = request.headers.get("Authorization");

  try {
    const res = await fetch(`${BACKEND_BASE_URL}/chat/rooms/left/${roomId}`, {
      method: "POST",
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("방 나가기 API 에러:", error);
    return NextResponse.json(
      { success: false, message: "서버 연결 실패" },
      { status: 500 },
    );
  }
}
