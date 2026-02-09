import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { refreshAccessToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const fetchProfile = (t: string) =>
      fetch("https://43.202.184.232.nip.io/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${t}`,
        },
      });

    let res = await fetchProfile(token || "");

    if (res.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        res = await fetchProfile(newToken);
      } else {
        return NextResponse.json({ message: "인증 만료" }, { status: 401 });
      }
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "인증 토큰 누락" }, { status: 401 });
    }

    const body = await req.json();

    const res = await fetch("https://43.202.184.232.nip.io/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    console.log("백엔드 PUT 응답 성공:", data.success);

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Profile PUT Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "인증 토큰 누락" }, { status: 401 });
    }

    const body = await req.json();

    const res = await fetch("https://43.202.184.232.nip.io/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
