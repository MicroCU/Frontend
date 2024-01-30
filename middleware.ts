import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { cookies } from "next/headers";

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const locales: string[] = Array.from(i18n.locales);
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );
  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

const concatLocale = (pathName: string, req: NextRequest) => {
  const locale = getLocale(req);
  return new URL(
    `/${locale}${pathName.startsWith("/") ? "" : "/"}${pathName}`,
    req.nextUrl.origin
  );
};

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
  const NoAuthPath = ["/th/auth", "/en/auth"];
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
