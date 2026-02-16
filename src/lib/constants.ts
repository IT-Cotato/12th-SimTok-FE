const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

if (!url && process.env.NODE_ENV !== "development") {
  throw new Error("BACKEND_BASE_URL environment variable is not set");
}

export const BACKEND_BASE_URL = url || "http://localhost:8080";
export const WS_BASE_URL =
  process.env.NEXT_PUBLIC_WS_URL || "wss://43.202.184.232.nip.io/ws";
