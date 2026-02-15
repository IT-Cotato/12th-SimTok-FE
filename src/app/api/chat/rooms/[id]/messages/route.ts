import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const resolvedParams = await params;
    const roomId = resolvedParams.id;

    const { searchParams } = request.nextUrl;
    const limit = searchParams.get("limit") || "20";
    const cursorSeq = searchParams.get("cursorSeq");

    let url = `https://43.202.184.232.nip.io/api/chat/rooms/${roomId}/messages?limit=${limit}`;
    if (cursorSeq) url += `&cursorSeq=${cursorSeq}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
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
