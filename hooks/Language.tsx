import { Locale, i18n } from "@/i18n-config";
import { useLocalStorage } from "./LocalStorage";

export function useLang() {
  return useLocalStorage<Locale>("locale", i18n.defaultLocale);
}
