import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const endpoint = request.url.replace("http://localhost:3000", "")
  return NextResponse.redirect(new URL(endpoint, "http://localhost:5000"));
}

export const config = {
  matcher: "/api/:path*",
};
