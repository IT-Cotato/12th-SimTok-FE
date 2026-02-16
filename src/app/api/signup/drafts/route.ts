import { NextResponse } from "next/server";

import { BACKEND_BASE_URL } from "@/lib/constants";

export async function POST() {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/signup/drafts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const body = await response.json();
    const draftKey = response.headers.get("signup-draft-key");

    return NextResponse.json(body, {
      status: response.status,
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
