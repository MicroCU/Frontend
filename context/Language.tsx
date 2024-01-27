"use client";
import { useLangLocal } from "@/hooks/Language";
import { i18n, Locale } from "@/i18n-config";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect
} from "react";

const LangContext = createContext<Locale>(i18n.defaultLocale);
const SetLangContext = createContext<Dispatch<SetStateAction<Locale>>>(
  () => {}
);

export function useLangContext() {
  return useContext(LangContext);
}

export function useSetLangContext() {
  return useContext(SetLangContext);
}

export function LangContextProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useLangLocal();
  useEffect(() => {
    setLang(lang);
  }, [lang]);
  return (
    <LangContext.Provider value={lang}>
      <SetLangContext.Provider value={setLang}>
        {children}
      </SetLangContext.Provider>
    </LangContext.Provider>
  );
}
