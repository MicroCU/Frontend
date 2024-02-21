"use client";
import { toast } from "@/components/ui/use-toast";
import { MenuTab } from "@/types/enum";
import { BriefPathInfo, ErrorAPI, JourneyStoreData } from "@/types/type";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { useTranslation } from "./Translation";
import { convertRecentlyToJourney } from "@/mock/recently_data";
import { convertSearchToJourney } from "@/mock/search_data";
import { fetchJourney, fetchRecently, fetchSearch } from "@/action/journey";

interface JourneyGraphContextType {
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

const JourneyGraphContext = createContext<JourneyGraphContextType>({
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
  const [error, setError] = useState<ErrorAPI | null>(null);
  const { dict } = useTranslation();
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: dict["home.general.error"],
        description: error.message
      });
      setError(null);
    }
  }, [error]);

  const handleFetchJourney = async () => {
    const result = await fetchJourney();
    if (result.status !== 200) {
      setError({
        status: result.status,
        message: result.message ? result.message : "Unknown error occurred"
      });
      return;
    }
    setJourneys({
      data: result.data.journeys,
      relationships: result.data.relationships
    });
  };

  const handleFetchRecently = async () => {
    const result = await fetchRecently();
    if (result.status !== 200) {
      setError({
        status: result.status,
        message: result.message ? result.message : "Unknown error occurred"
      });
      return;
    }
    const journey = convertRecentlyToJourney(result.data);
    setJourneys(journey);
  };

  const handleFetchSearch = async (searchText: string) => {
    const result = await fetchSearch(searchText);
    if (result.status !== 200) {
      setError({
        status: result.status,
        message: result.message ? result.message : "Unknown error occurred"
      });
      return;
    }
    const journey = convertSearchToJourney(result.data);
    setJourneys(journey);
  };

  useEffect(() => {
    if (selectedTab === MenuTab.journey) {
      setJourneys(null);
      setSearchKeyword("");
      setSelectedPath(null);
      handleFetchJourney();
    } else if (selectedTab === MenuTab.recently) {
      setJourneys(null);
      setSearchKeyword("");
      setSelectedPath(null);
      handleFetchRecently();
    } else if (selectedTab === MenuTab.search) {
      setJourneys(null);
      setSelectedPath(null);
      handleFetchSearch(searchKeyword);
    }
  }, [selectedTab, searchKeyword]);

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
        setSearchKeyword,
        error,
        setError
      }}
    >
      {children}
    </JourneyGraphContext.Provider>
  );
}
