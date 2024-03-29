"use client";
import { toast } from "@/components/ui/use-toast";
import { MenuTab } from "@/types/enum";
import { ErrorAPI, JourneyData } from "@/types/type";
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

  const handleFetchJourney = async () => {
    const result = await fetchJourney();
    if (result.status !== 200) {
      setError({
        status: result.status,
        message: result.message ? result.message : "Unknown error occurred"
      });
      return;
    }
    setJourneys(result.data.journeys);
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
    setJourneys(journey.data);
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
    setJourneys(journey.data);
  };

  useEffect(() => {
    if (selectedTab === MenuTab.journey) {
      setJourneys(null);
      setSearchKeyword("");
      handleFetchJourney();
    } else if (selectedTab === MenuTab.recently) {
      setJourneys(null);
      setSearchKeyword("");
      handleFetchRecently();
    } else if (selectedTab === MenuTab.search) {
      if (searchKeyword === "") {
        setJourneys([]);
      } else {
        setJourneys(null);
        handleFetchSearch(searchKeyword);
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
