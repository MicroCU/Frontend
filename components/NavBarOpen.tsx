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
import { useJourneyGraph } from "@/context/JourneysGraph";
import { MockHomeData } from "@/mock/journey_data";
import { convertRecentlyToJourney } from "@/mock/recently_data";
import PathList from "./PathList";
import { JourneyNormalContextProvider } from "@/context/JourneysNormal";

interface NavBarOpenModeProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NavBarOpenMode({ setIsOpen }: NavBarOpenModeProps) {
  const { dict } = useTranslation();
  const { setJourneys, setSelectedTab, setSearchKeyword } = useJourneyGraph();
  useEffect(() => {
    setJourneys({
      data: MockHomeData.journeys,
      relationships: MockHomeData.relationships
    });
  }, []);

  return (
    <ScrollArea className="h-screen w-72">
      <div className="space-y-6 p-6 bg-white shadow-md min-h-screen flex flex-col">
        <NavHeader setIsOpen={setIsOpen} />
        <Tabs defaultValue={MenuTab.journey} className="flex-1 w-60">
          <TabsList className="grid w-full grid-cols-3 bg-grayLight mb-6">
            <TabsTrigger
              value={MenuTab.journey}
              onClick={() => {
                setSelectedTab(MenuTab.journey);
                setJourneys({
                  data: MockHomeData.journeys,
                  relationships: MockHomeData.relationships
                });
                setSearchKeyword("");
              }}
            >
              {dict["home.tabs.journey"]}
            </TabsTrigger>
            <TabsTrigger
              value={MenuTab.recently}
              onClick={() => {
                setSelectedTab(MenuTab.recently);
                setJourneys(convertRecentlyToJourney());
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
          <TabsContent value={MenuTab.recently}>
            <PathList />
          </TabsContent>
          <TabsContent value={MenuTab.search}>
            <SearchInput />
            <PathList />
          </TabsContent>
        </Tabs>
        <JourneyNormalContextProvider>
          <NormalModal />
        </JourneyNormalContextProvider>
      </div>
    </ScrollArea>
  );
}
