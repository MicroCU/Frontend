"use client";
import { MenuTab } from "@/types/enum";
import { JourneyData } from "@/types/type";
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
  journeys: JourneyData[] | null;
  setJourneys: Dispatch<SetStateAction<JourneyData[] | null>>;
}

const JourneyContext = createContext<JourneyContextType>({
  selectedTab: MenuTab.journey,
  setSelectedTab: () => {},
  searchKeyword: "",
  setSearchKeyword: () => {},
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
  return (
    <JourneyContext.Provider
      value={{
        journeys,
        setJourneys,
        selectedTab,
        setSelectedTab,
        searchKeyword,
        setSearchKeyword
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}
