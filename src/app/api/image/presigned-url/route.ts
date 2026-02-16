import { NextResponse } from "next/server";

import { BACKEND_BASE_URL } from "@/lib/constants";
import axios from "axios";

export async function POST(request: Request) {
  try {
    // 클라이언트가 보낸 헤더에서 토큰을 추출 (Authorization: Bearer ...)
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json(
        { message: "인증 헤더가 없습니다." },
        { status: 401 },
      );
    }

    const body = await request.json();

    // 서버(Next.js) -> 백엔드 서버 호출 (CORS 발생 안 함)
    const response = await axios.post(
      `${BACKEND_BASE_URL}/image/presigned-url`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    // 🔍 TypeScript에게 '이 error는 Axios 에러야'라고 알려주는 과정입니다.
    if (axios.isAxiosError(error)) {
      console.error("백엔드 에러 상세:", error.response?.data);

      return NextResponse.json(
        error.response?.data || { message: "백엔드 응답 오류" },
        { status: error.response?.status || 500 },
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 에러 발생";
    console.error("내부 서버 에러:", errorMessage);

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
