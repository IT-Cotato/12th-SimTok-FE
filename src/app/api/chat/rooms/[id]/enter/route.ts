import { NextRequest, NextResponse } from "next/server";

import { BACKEND_BASE_URL } from "@/lib/constants";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const roomId = params.id;
  const authHeader = request.headers.get("Authorization");

  try {
    const res = await fetch(
      `${BACKEND_BASE_URL}/api/chat/rooms/${roomId}/enter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader && { Authorization: authHeader }),
        },
      },
    );

    const result = await res.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat Enter API Error:", error);
    return NextResponse.json({ error: "서버 연결 실패" }, { status: 500 });
  }
}
