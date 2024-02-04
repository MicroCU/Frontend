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

interface NavBarOpenModeProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NavBarOpenMode({ setIsOpen }: NavBarOpenModeProps) {
  const { dict } = useTranslation();
  const { setJourneys, selectedTab, setSelectedTab, setSearchKeyword } =
    useJourney();
  useEffect(() => {
    fetchJourneyGraph(setJourneys);
  }, []);

  return (
    <ScrollArea className="h-screen w-72">
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
                fetchJourneyGraph(setJourneys);
              }}
            >
              {dict["home.tabs.journey"]}
            </TabsTrigger>
            <TabsTrigger
              value={MenuTab.recently}
              onClick={() => {
                setSelectedTab(MenuTab.recently);
                fetchRecentlyGraph(setJourneys);
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
        </Tabs>
        <NormalModal />
      </div>
    </ScrollArea>
  );
}
