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

interface NavBarOpenModeProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NavBarOpenMode({ setIsOpen }: NavBarOpenModeProps) {
  const { dict } = useTranslation();
  return (
    <ScrollArea className="h-screen w-72">
      <div className="space-y-6 p-6 bg-white shadow-md min-h-screen flex flex-col">
        <NavHeader setIsOpen={setIsOpen} />
        <Tabs defaultValue={MenuTab.search} className="flex-1 w-60">
          {" "}
          {/* NEED CHANGE */}
          <TabsList className="grid w-full grid-cols-3 bg-grayLight mb-6">
            <TabsTrigger value={MenuTab.journey}>
              {dict["home.tabs.journey"]}
            </TabsTrigger>
            <TabsTrigger value={MenuTab.recently}>
              {dict["home.tabs.recently"]}
            </TabsTrigger>
            <TabsTrigger value={MenuTab.search}>
              {dict["home.tabs.search"]}
            </TabsTrigger>
          </TabsList>
          <TabsContent value={MenuTab.journey}>
            <JourneyItems className="flex-1" />
          </TabsContent>
          <TabsContent value={MenuTab.recently}></TabsContent>
          <TabsContent value={MenuTab.search}>
            <SearchInput />
          </TabsContent>
        </Tabs>
        <NormalModal />
      </div>
    </ScrollArea>
  );
}
