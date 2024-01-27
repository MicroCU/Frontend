"use client";
import { getDictionary } from "@/get-dictionary";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { useLangContext } from "./Language";

const DictionaryContext = createContext<Record<string, string>>({});

export function useDictionaryContext() {
  return useContext(DictionaryContext);
}

export function DictionaryContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const lang = useLangContext();
  const [dictionary, setDictionary] = useState<Record<string, string>>({});
  useEffect(() => {
    const fetchDictionary = async () => {
      const newDictionary = await getDictionary(lang);
      setDictionary(newDictionary);
    };

    fetchDictionary();
  }, [lang]);

  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}
