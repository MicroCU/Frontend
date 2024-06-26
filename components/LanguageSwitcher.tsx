"use client";
import { Locale, i18n } from "@/i18n-config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/context/Translation";
import I18nTypo from "./ui/I18nTypo";

export default function LanguageSwitcher() {
  const { lang, setLang } = useTranslation();
  const pathName = usePathname();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex flex-row">
      {i18n.locales.map((localeName, index) => {
        return (
          <div key={localeName} className="flex flex-row">
            <Link
              href={redirectedPathName(localeName)}
              className={`${
                lang === localeName ? "text-primary" : "text-black"
              } px-2`}
              onClick={() => {
                setLang(localeName);
              }}
            >
              <I18nTypo> {getSettingLanguageName(localeName)} </I18nTypo>
            </Link>
            {index !== i18n.locales.length - 1 && (
              <Separator orientation="vertical" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function getSettingLanguageName(locale: Locale) {
  switch (locale) {
    case "en":
      return "EN";
    case "th":
      return "ไทย";
    default:
      return "EN";
  }
}
