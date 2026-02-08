import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(
      "https://43.202.184.232.nip.io/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    const data = await response.json();
    if (!response.ok)
      return NextResponse.json(data, { status: response.status });

    const token = data.data?.accessToken?.accessToken;
    const refreshToken = data.data?.refreshToken?.refreshToken;

    if (!token || typeof token !== "string") {
      console.error(
        "토큰 추출 실패. 백엔드 응답 구조 확인:",
        JSON.stringify(data.data, null, 2),
      );
      return NextResponse.json(
        { message: "인증 토큰을 생성할 수 없습니다." },
        { status: 500 },
      );
    }

    const res = NextResponse.json(data);
    const cookieStore = await cookies();

    // Access Token 쿠키 저장
    cookieStore.set("accessToken", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, //일
    });

    // Refresh Token 쿠키 저장
    if (refreshToken) {
      cookieStore.set("refreshToken", refreshToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 14, // 14일
      });
    }

    console.log("모든 토큰 쿠키 저장 완료");
    return res;
  } catch (error) {
    console.error("Login Proxy Error:", error);
    return NextResponse.json({ message: "서버 연결 실패" }, { status: 500 });
  }
}
