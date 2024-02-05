"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import JourneyItems from "./JourneyItems";
import NavHeader from "./NavHeader";
import NormalModal from "./NormalModal";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "@/context/Translation";
import { ScrollArea } from "./ui/scroll-area";
import { MenuTab } from "@/types/enum";
import SearchInput from "./SearchInput";
import { useJourney } from "@/context/Journeys";
import PathList from "./PathList";
import { fetchJourneyGraph, fetchRecentlyGraph } from "@/mock/api";
import { useToast } from "./ui/use-toast";

interface NavBarOpenModeProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NavBarOpenMode({ setIsOpen }: NavBarOpenModeProps) {
  const { dict } = useTranslation();
  const { toast } = useToast();
  const {
    setJourneys,
    selectedTab,
    setSelectedTab,
    setSearchKeyword,
    error,
    setError
  } = useJourney();
  useEffect(() => {
    fetchJourneyGraph(setJourneys, setError);
  }, []);

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

  return (
    <div className="space-y-6 p-6 bg-white shadow-md min-h-screen flex flex-col">
      <NavHeader setIsOpen={setIsOpen} />
      <Tabs
        defaultValue={MenuTab.journey}
        className="flex-1 flex flex-col w-60"
      >
        <TabsList className="grid w-full grid-cols-3 bg-grayLight">
          <TabsTrigger
            value={MenuTab.journey}
            onClick={() => {
              setSelectedTab(MenuTab.journey);
              setSearchKeyword("");
              fetchJourneyGraph(setJourneys, setError);
            }}
          >
            {dict["home.tabs.journey"]}
          </TabsTrigger>
          <TabsTrigger
            value={MenuTab.recently}
            onClick={() => {
              setSelectedTab(MenuTab.recently);
              fetchRecentlyGraph(setJourneys, setError);
              setSearchKeyword("");
            }}
          >
            {dict["home.tabs.recently"]}
          </TabsTrigger>
          <TabsTrigger
            value={MenuTab.search}
            onClick={() => {
              setSelectedTab(MenuTab.search);
              setJourneys(null);
            }}
          >
            {dict["home.tabs.search"]}
          </TabsTrigger>
        </TabsList>
        <ScrollArea
          className="w-full"
          style={{ height: "calc(100vh - 200px)" }}
        >
          <TabsContent value={MenuTab.journey}>
            <JourneyItems className="flex-1" />
          </TabsContent>
          <TabsContent
            value={MenuTab.recently}
            className={`${
              selectedTab === MenuTab.recently ? "flex flex-col flex-1" : ""
            }`}
          >
            <PathList />
            <PathList />
            <PathList />
            <PathList />
            <PathList />
          </TabsContent>
          <TabsContent
            value={MenuTab.search}
            className={`${
              selectedTab === MenuTab.search ? "flex flex-col flex-1" : ""
            }`}
          >
            <SearchInput />
            <PathList />
          </TabsContent>
        </ScrollArea>
      </Tabs>
      <NormalModal />
    </div>
  );
}
