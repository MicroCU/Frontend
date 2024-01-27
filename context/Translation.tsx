"use client";
import { getDictionary } from "@/lib/get-dictionary";
import { useLangLocal } from "@/hooks/Language";
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

export function TranslationContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [lang, setLang] = useLangLocal();
  const [dictionary, setDictionary] = useState<Record<string, string>>({});
  useEffect(() => {
    const fetchDictionary = async () => {
      const newDictionary = await getDictionary(lang);
      setDictionary(newDictionary);
    };

    fetchDictionary();
  }, [lang]);

  return (
    <TranslationContext.Provider value={{ dict: dictionary, lang, setLang }}>
      {children}
    </TranslationContext.Provider>
  );
}
