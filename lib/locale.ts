import { i18n } from "@/i18n-config";
import Negotiator from "negotiator";
import { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";

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

export const concatLocale = (pathName: string, req: NextRequest) => {
  const locale = getLocale(req);
  return new URL(
    `/${locale}${pathName.startsWith("/") ? "" : "/"}${pathName}`,
    req.nextUrl.origin
  );
};
