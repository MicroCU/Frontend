"use client";
import { getDictionary } from "@/lib/get-dictionary";
import { i18n, Locale } from "@/i18n-config";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";
import { usePathname } from "next/navigation";

interface TranslationContextType {
  dict: Record<string, string>;
  lang: Locale;
  setLang: Dispatch<SetStateAction<Locale>>;
}

const TranslationContext = createContext<TranslationContextType>({
  dict: {},
  lang: i18n.defaultLocale,
  setLang: () => {}
});

export function useTranslation() {
  return useContext(TranslationContext);
}

const langKey = "lang";

export function TranslationContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const pathName = usePathname();
  const segments = pathName.split("/");
  const [lang, setLang] = useState<Locale>(
    (segments[1] as Locale) || i18n.defaultLocale
  );
  const [dictionary, setDictionary] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = localStorage.getItem(langKey);
    if (stored) {
      setLang(stored as Locale);
    }
  }, []);

  useEffect(() => {
    const fetchDictionary = async () => {
      const newDictionary = await getDictionary(lang);
      setDictionary(newDictionary);
    };

    fetchDictionary();

    localStorage.setItem(langKey, lang);
  }, [lang]);

  return (
    <TranslationContext.Provider value={{ dict: dictionary, lang, setLang }}>
      {children}
    </TranslationContext.Provider>
  );
}
