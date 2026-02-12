const url = process.env.BACKEND_BASE_URL;
if (!url) {
  throw new Error("BACKEND_BASE_URL environment variable is not set");
}
export const BACKEND_BASE_URL = url;
