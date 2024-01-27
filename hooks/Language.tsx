import { Locale, i18n } from "@/i18n-config";
import { useLocalStorage } from "./LocalStorage";
import { usePathname } from "next/navigation";

export function useLangLocal() {
  const pathName = usePathname();
  const segments = pathName.split("/");
  return useLocalStorage<Locale>(
    "locale",
    (segments[1] as Locale) || i18n.defaultLocale
  );
}
