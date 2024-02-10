"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import JourneyItems from "./JourneyItems";
import NavHeader from "./NavHeader";
import NormalModal from "./NormalModal";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "@/context/Translation";
import { ScrollArea } from "./ui/scroll-area";
import { MenuTab } from "@/types/enum";
import SearchInput from "./SearchInput";
import { useJourneyGraph } from "@/context/JourneysGraph";
import PathList from "./PathList";
import { JourneyStoreData } from "@/types/type";
import { JourneyNormalContextProvider } from "@/context/JourneysNormal";

interface NavBarOpenModeProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NavBarOpenMode({ setIsOpen }: NavBarOpenModeProps) {
  const { dict } = useTranslation();
  const {
    journeys,
    setJourneys,
    setSelectedTab,
    searchKeyword,
    setSearchKeyword,
    setSelectedPath,
    setError
  } = useJourneyGraph();

  return (
    <div className="space-y-6 p-6 bg-white shadow-md min-h-screen flex flex-col">
      <NavHeader setIsOpen={setIsOpen} />
      <Tabs
        defaultValue={MenuTab.journey}
        className="flex-1 flex flex-col w-64"
      >
        <TabsList className="grid w-full grid-cols-3 bg-grayLight mb-5">
          <TabsTrigger
            value={MenuTab.journey}
            onClick={() => {
              setJourneys(null);
              setSearchKeyword("");
              setSelectedPath(null);
              setSelectedTab(MenuTab.journey);
            }}
            disabled={!journeys}
          >
            {dict["home.tabs.journey"]}
          </TabsTrigger>
          <TabsTrigger
            value={MenuTab.recently}
            onClick={() => {
              setJourneys(null); // TODO: Merge this
              setSearchKeyword("");
              setSelectedPath(null);
              setSelectedTab(MenuTab.recently);
            }}
            disabled={!journeys}
          >
            {dict["home.tabs.recently"]}
          </TabsTrigger>
          <TabsTrigger
            value={MenuTab.search}
            onClick={() => {
              setSelectedPath(null);
              setJourneys({} as JourneyStoreData);
              setSelectedTab(MenuTab.search);
            }}
            disabled={!journeys}
          >
            {dict["home.tabs.search"]}
          </TabsTrigger>
        </TabsList>
        <ScrollArea
          className="w-full"
          style={{ height: "calc(100vh - 220px)" }}
        >
          <TabsContent value={MenuTab.journey}>
            <JourneyItems className="flex-1" />
          </TabsContent>
          <TabsContent value={MenuTab.recently}>
            <PathList />
          </TabsContent>
          <TabsContent value={MenuTab.search}>
            <SearchInput
              setSearchKeyword={setSearchKeyword}
              setSelectedPath={setSelectedPath}
            />
            <PathList />
          </TabsContent>
        </ScrollArea>
      </Tabs>
      <JourneyNormalContextProvider>
        <NormalModal />
      </JourneyNormalContextProvider>
    </div>
  );
}
