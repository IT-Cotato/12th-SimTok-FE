import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch(
      "https://43.202.184.232.nip.io/api/signup/drafts",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
    );

    const body = await response.json();
    const draftKey = response.headers.get("signup-draft-key");

    return NextResponse.json(body, {
      headers: {
        "signup-draft-key": draftKey || "",
        "Access-Control-Expose-Headers": "signup-draft-key",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
