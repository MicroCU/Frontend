"use client";
import { useLang } from "@/hooks/Language";
import { i18n, Locale } from "@/i18n-config";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext
} from "react";

const LangModeContext = createContext<Locale>(i18n.defaultLocale);
const SetLangModeContext = createContext<Dispatch<SetStateAction<Locale>>>(
  () => {}
);

export function useLangModeContext() {
  return useContext(LangModeContext);
}

export function useSetDarkModeContext() {
  return useContext(SetLangModeContext);
}

export function LangModeContextProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useLang();
  return (
    <LangModeContext.Provider value={lang}>
      <SetLangModeContext.Provider value={setLang}>
        {children}
      </SetLangModeContext.Provider>
    </LangModeContext.Provider>
  );
}
