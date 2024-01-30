"use client";
import { MenuTab } from "@/types/enum";
import { BriefPathInfo, JourneyData } from "@/types/type";
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
  journeys: JourneyData[] | null;
  setJourneys: Dispatch<SetStateAction<JourneyData[] | null>>;
}

const JourneyContext = createContext<JourneyContextType>({
  selectedTab: MenuTab.journey,
  setSelectedTab: () => {},
  searchKeyword: "",
  setSearchKeyword: () => {},
  selectedPath: null,
  setSelectedPath: () => {},
  journeys: null,
  setJourneys: () => {}
});

export function useJourney() {
  return useContext(JourneyContext);
}

export function JourneyContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [journeys, setJourneys] = useState<JourneyData[] | null>(null);
  const [selectedTab, setSelectedTab] = useState<MenuTab>(MenuTab.journey);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedPath, setSelectedPath] = useState<BriefPathInfo | null>(null);
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
        setSearchKeyword
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}
