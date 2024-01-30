import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n-config";
import { cookies } from "next/headers";
import { concatLocale } from "./lib/locale";
import { NoAuthPath } from "./context/Auth";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (
    [
      "/cv-logo.png",
      "/cu.svg",
      "/chula.svg",
      "/next.svg",
      "/vercel.svg",
      "/api"
    ].includes(pathname)
  )
    return;

  // translation
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(concatLocale(pathname, req)));
  }

  // auth

  if (NoAuthPath.includes(pathname)) return;
  const accessToken = cookies().get("access_token")?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL(concatLocale("/auth", req)));
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
