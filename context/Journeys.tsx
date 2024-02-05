"use client";
import { MenuTab } from "@/types/enum";
import { BriefPathInfo, ErrorAPI, JourneyStoreData } from "@/types/type";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from "react";

interface JourneyContextType {
  selectedTab: MenuTab;
  setSelectedTab: Dispatch<SetStateAction<MenuTab>>;
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  selectedPath: BriefPathInfo | null;
  setSelectedPath: Dispatch<SetStateAction<BriefPathInfo | null>>;
  journeys: JourneyStoreData | null;
  setJourneys: Dispatch<SetStateAction<JourneyStoreData | null>>;
  error: ErrorAPI | null;
  setError: Dispatch<SetStateAction<ErrorAPI | null>>;
}

const JourneyContext = createContext<JourneyContextType>({
  selectedTab: MenuTab.journey,
  setSelectedTab: () => {},
  searchKeyword: "",
  setSearchKeyword: () => {},
  selectedPath: null,
  setSelectedPath: () => {},
  journeys: null,
  setJourneys: () => {},
  error: null,
  setError: () => {}
});

export function useJourney() {
  return useContext(JourneyContext);
}

export function JourneyContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [journeys, setJourneys] = useState<JourneyStoreData | null>(null);
  const [selectedTab, setSelectedTab] = useState<MenuTab>(MenuTab.journey);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedPath, setSelectedPath] = useState<BriefPathInfo | null>(null);
  const [error, setError] = useState<ErrorAPI | null>(null);
  return (
    <JourneyContext.Provider
      value={{
        journeys,
        setJourneys,
        selectedTab,
        setSelectedTab,
        selectedPath,
        setSelectedPath,
        searchKeyword,
        setSearchKeyword,
        error,
        setError
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}
