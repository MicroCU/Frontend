"use client";
import { toast } from "@/components/ui/use-toast";
import { MenuTab } from "@/types/enum";
import {
  ErrorAPI,
  HomePageData,
  JourneyData,
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

interface JourneyNormalContextType {
  selectedTab: MenuTab;
  setSelectedTab: Dispatch<SetStateAction<MenuTab>>;
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  journeys: JourneyData[] | null;
  setJourneys: Dispatch<SetStateAction<JourneyData[] | null>>;
  error: ErrorAPI | null;
  setError: Dispatch<SetStateAction<ErrorAPI | null>>;
}

const JourneyNormalContext = createContext<JourneyNormalContextType>({
  selectedTab: MenuTab.journey,
  setSelectedTab: () => {},
  searchKeyword: "",
  setSearchKeyword: () => {},
  journeys: null,
  setJourneys: () => {},
  error: null,
  setError: () => {}
});

export function useJourneyNormal() {
  return useContext(JourneyNormalContext);
}

export function JourneyNormalContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [journeys, setJourneys] = useState<JourneyData[] | null>(null);
  const [selectedTab, setSelectedTab] = useState<MenuTab>(MenuTab.journey);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
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
      fetchJourney(setJourneys, setError);
    } else if (selectedTab === MenuTab.recently) {
      setJourneys(null);
      setSearchKeyword("");
      fetchRecently(setJourneys, setError);
    } else if (selectedTab === MenuTab.search) {
      if (searchKeyword === "") {
        setJourneys([]);
      } else {
        setJourneys(null);
        fetchSearch(setJourneys, searchKeyword, setError);
      }
    }
  }, [selectedTab, searchKeyword]);

  return (
    <JourneyNormalContext.Provider
      value={{
        journeys,
        setJourneys,
        selectedTab,
        setSelectedTab,
        searchKeyword,
        setSearchKeyword,
        error,
        setError
      }}
    >
      {children}
    </JourneyNormalContext.Provider>
  );
}

async function fetchJourney(
  setJourneys: Dispatch<SetStateAction<JourneyData[] | null>>,
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
    setJourneys(result.journeys);
  } catch (error) {
    console.error("error: ", error);
  }
}

async function fetchRecently(
  setJourneys: Dispatch<SetStateAction<JourneyData[] | null>>,
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
    setJourneys(journey.data);
  } catch (error) {
    console.error("error: ", error);
  }
}

async function fetchSearch(
  setJourneys: Dispatch<SetStateAction<JourneyData[] | null>>,
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
    setJourneys(journey.data);
  } catch (error) {
    console.error("error: ", error);
  }
}
