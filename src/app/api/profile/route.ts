import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { refreshAccessToken } from "@/lib/auth";
import { BACKEND_BASE_URL } from "@/lib/constants";

const PROFILE_API = `${BACKEND_BASE_URL}/profile`;

async function fetchWithAuth(url: string, method: string, body?: unknown) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const executeFetch = (t: string) =>
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

  let res = await executeFetch(token || "");

  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) res = await executeFetch(newToken);
  }
  return res;
}

export async function GET() {
  try {
    const res = await fetchWithAuth(PROFILE_API, "GET");
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetchWithAuth(PROFILE_API, "PUT", body);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetchWithAuth(PROFILE_API, "POST", body);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
