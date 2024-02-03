"use client";
import { MenuTab } from "@/types/enum";
import { BriefPathInfo, JourneyStoreData } from "@/types/type";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from "react";

interface JourneyGraphContextType {
  selectedTab: MenuTab;
  setSelectedTab: Dispatch<SetStateAction<MenuTab>>;
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  selectedPath: BriefPathInfo | null;
  setSelectedPath: Dispatch<SetStateAction<BriefPathInfo | null>>;
  journeys: JourneyStoreData | null;
  setJourneys: Dispatch<SetStateAction<JourneyStoreData | null>>;
}

const JourneyGraphContext = createContext<JourneyGraphContextType>({
  selectedTab: MenuTab.journey,
  setSelectedTab: () => {},
  searchKeyword: "",
  setSearchKeyword: () => {},
  selectedPath: null,
  setSelectedPath: () => {},
  journeys: null,
  setJourneys: () => {}
});

export function useJourneyGraph() {
  return useContext(JourneyGraphContext);
}

export function JourneyGraphContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [journeys, setJourneys] = useState<JourneyStoreData | null>(null);
  const [selectedTab, setSelectedTab] = useState<MenuTab>(MenuTab.journey);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedPath, setSelectedPath] = useState<BriefPathInfo | null>(null);
  return (
    <JourneyGraphContext.Provider
      value={{
        journeys,
        setJourneys,
        selectedTab,
        setSelectedTab,
        selectedPath,
        setSelectedPath,
        searchKeyword,
        setSearchKeyword
      }}
    >
      {children}
    </JourneyGraphContext.Provider>
  );
}
