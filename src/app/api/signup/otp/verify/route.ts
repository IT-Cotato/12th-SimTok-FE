import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const draftKey = req.headers.get("Signup-Draft-Key") || "";

  const res = await fetch(
    "https://43.202.184.232.nip.io/api/signup/otp/verify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Signup-Draft-Key": draftKey,
      },
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
