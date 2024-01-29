"use client";
import { Page } from "@/types/enum";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import JourneyItems, { IJourneyItem } from "./JourneyItems";
import NavHeader from "./NavHeader";
import NormalModal from "./NormalModal";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "@/context/Translation";

interface NavBarOpenModeProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  journeys: IJourneyItem[];
}

export default function NavBarOpenMode({
  setIsOpen,
  journeys
}: NavBarOpenModeProps) {
  const { dict } = useTranslation();
  return (
    <div className="space-y-6 p-6 bg-white shadow-md h-screen w-fit flex flex-col">
      <NavHeader setIsOpen={setIsOpen} />
      <Tabs defaultValue={Page.Journey} className="flex-1">
        <TabsList className="grid w-full grid-cols-3 bg-grayLight mb-6">
          <TabsTrigger value="journey">{dict["home.tabs.journey"]}</TabsTrigger>
          <TabsTrigger value="recently">
            {dict["home.tabs.recently"]}
          </TabsTrigger>
          <TabsTrigger value="search">{dict["home.tabs.search"]}</TabsTrigger>
        </TabsList>
        <TabsContent value={Page.Journey}>
          <JourneyItems journeys={journeys} className="flex-1" />
        </TabsContent>
        <TabsContent value={Page.Recently}></TabsContent>
        <TabsContent value={Page.Search}></TabsContent>
      </Tabs>
      <NormalModal />
    </div>
  );
}
