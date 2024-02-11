"use client";
import { toast } from "@/components/ui/use-toast";
import { MenuTab } from "@/types/enum";
import {
  BriefPathInfo,
  ErrorAPI,
  HomePageData,
  JourneyStoreData,
  RecentlyPageData,
  SearchPageData
} from "@/types/type";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { useTranslation } from "./Translation";
import { getHomeResult } from "@/mock/journey_data";
import {
  getRecentlyResult,
  convertRecentlyToJourney
} from "@/mock/recently_data";
import { getSearchResult, convertSearchToJourney } from "@/mock/search_data";

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

  useEffect(() => {
    if (selectedTab === MenuTab.journey) {
      setJourneys(null);
      setSearchKeyword("");
      setSelectedPath(null);
      fetchJourney(setJourneys, setError);
    } else if (selectedTab === MenuTab.recently) {
      setJourneys(null);
      setSearchKeyword("");
      setSelectedPath(null);
      fetchRecently(setJourneys, setError);
    } else if (selectedTab === MenuTab.search) {
      if (searchKeyword === "") {
        setSelectedPath(null);
        setJourneys({} as JourneyStoreData);
      } else {
        setJourneys(null);
        fetchSearch(setJourneys, searchKeyword, setError);
      }
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

async function fetchJourney(
  setJourneys: Dispatch<SetStateAction<JourneyStoreData | null>>,
  setError: Dispatch<SetStateAction<ErrorAPI | null>>
) {
  try {
    const resp = await getHomeResult();
    const status = resp.status;
    if (status !== 200) {
      const errMesg = resp.message;
      setError({
        status: status,
        message: errMesg ? errMesg : "Unknown error"
      });
      return;
    }
    const result = resp.data as HomePageData;
    setJourneys({
      data: result.journeys,
      relationships: result.relationships
    });
  } catch (error) {
    console.error("error: ", error);
  }
}

async function fetchRecently(
  setJourneys: Dispatch<SetStateAction<JourneyStoreData | null>>,
  setError: Dispatch<SetStateAction<ErrorAPI | null>>
) {
  try {
    const resp = await getRecentlyResult();
    const status = resp.status;
    if (status !== 200) {
      const errMesg = resp.message;
      setError({
        status: status,
        message: errMesg ? errMesg : "Unknown error"
      });
      return;
    }
    const result = resp.data as RecentlyPageData;
    const journey = convertRecentlyToJourney(result);
    setJourneys(journey);
  } catch (error) {
    console.error("error: ", error);
  }
}

async function fetchSearch(
  setJourneys: Dispatch<SetStateAction<JourneyStoreData | null>>,
  serachText: string,
  setError: Dispatch<SetStateAction<ErrorAPI | null>>
) {
  try {
    const resp = await getSearchResult(serachText);
    const status = resp.status;
    if (status !== 200) {
      const errMesg = resp.message;
      setError({
        status: status,
        message: errMesg ? errMesg : "Unknown error"
      });
      return;
    }
    const result = resp.data as SearchPageData;
    const journey = convertSearchToJourney(result);
    setJourneys(journey);
  } catch (error) {
    console.error("error: ", error);
  }
}