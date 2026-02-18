import { NextRequest, NextResponse } from "next/server";

import { BACKEND_BASE_URL } from "@/lib/constants";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id: roomId } = await context.params;
    const authHeader = request.headers.get("Authorization");

    const res = await fetch(`${BACKEND_BASE_URL}/chat/rooms/${roomId}/enter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
    });

    const result = await res.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat Enter API Error:", error);
    return NextResponse.json({ error: "서버 연결 실패" }, { status: 500 });
  }
}
