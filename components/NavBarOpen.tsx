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
import { JourneyNormalContextProvider } from "@/context/JourneysNormal";
import { JourneyStoreData } from "@/types/type";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { logout } from "@/action/mcv";
import I18nTypo from "./ui/i18nTypo";

interface NavBarOpenModeProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NavBarOpenMode({ setIsOpen }: NavBarOpenModeProps) {
  const { dict } = useTranslation();
  const {
    journeys,
    setJourneys,
    selectedTab,
    setSelectedTab,
    setSearchKeyword,
    setSelectedPath
  } = useJourneyGraph();

  return (
    <div className="space-y-6 p-6 bg-white shadow-md min-h-screen flex flex-col">
      <NavHeader setIsOpen={setIsOpen} />
      <Tabs
        defaultValue={selectedTab}
        className="flex-1 flex flex-col w-64"
        onValueChange={() => {
          setJourneys({} as JourneyStoreData);
        }}
      >
        <TabsList className="grid w-full grid-cols-3 bg-grayLight mb-5">
          <TabsTrigger
            value={MenuTab.journey}
            onClick={() => {
              setSelectedTab(MenuTab.journey);
            }}
            disabled={!journeys}
          >
            <I18nTypo>{dict["home.tabs.journey"]}</I18nTypo>
          </TabsTrigger>
          <TabsTrigger
            value={MenuTab.recently}
            onClick={() => {
              setSelectedTab(MenuTab.recently);
            }}
            disabled={!journeys}
          >
            <I18nTypo>{dict["home.tabs.recently"]}</I18nTypo>
          </TabsTrigger>
          <TabsTrigger
            value={MenuTab.search}
            onClick={() => {
              setSelectedTab(MenuTab.search);
            }}
            disabled={!journeys}
          >
            <I18nTypo>{dict["home.tabs.search"]}</I18nTypo>
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
        <div className="grid gap-2 grid-cols-4">
          <Button
            className="col-span-1 bg-grayMain hover:bg-black"
            onClick={() => logout()}
          >
            <LogOut className="p-0.5" />
          </Button>
          <NormalModal className="col-span-3" />
        </div>
      </JourneyNormalContextProvider>
    </div>
  );
}
