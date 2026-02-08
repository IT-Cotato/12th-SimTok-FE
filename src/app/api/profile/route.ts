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
