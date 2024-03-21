export function middleware(request) {
  const session = request.cookies.get("session")?.value

  if (!session && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
}
