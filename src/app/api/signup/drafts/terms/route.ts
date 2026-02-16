import { NextResponse } from "next/server";

import { BACKEND_BASE_URL } from "@/lib/constants";

export async function POST(req: Request) {
  const body = await req.json();
  const draftKey = req.headers.get("Signup-Draft-Key") || "";

  const res = await fetch(`${BACKEND_BASE_URL}/api/signup/drafts/terms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Signup-Draft-Key": draftKey,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
