import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fetchApiGET } from "./lib/api";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/login") return null

  let user = request.cookies.get("user");
  if (!user) return NextResponse.redirect(new URL("/login", request.url))

  let headers = {'Authorization': user.value}
  let response = await fetchApiGET('/me', headers)
  if(!response.ok) return NextResponse.redirect(new URL("/login", request.url))

  return null;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
