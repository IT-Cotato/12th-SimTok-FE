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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("백엔드 에러 응답:", errorText);
      return NextResponse.json(
        { message: "백엔드 서버 오류" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy 내부 에러 상세:", error); // 터미널(VSCode) 확인
    return NextResponse.json(
      { message: "서버 연결에 실패했습니다 (8080 확인 필요)" },
      { status: 500 },
    );
  }
}
