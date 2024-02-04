"use client";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { useTranslation } from "@/context/Translation";
import { MenuTab } from "@/types/enum";
import { useEffect, useState } from "react";
import { JourneyData } from "@/types/type";
import JourneyModalCollection from "./JourneyModalCollection";
import PathCardRecentlyCollection from "./PathCardCollection";
import PathCardSearchCollection from "./PathCardSearchCollection";
import { fetchJourneyNormal, fetchRecentlyNormal } from "@/mock/api";

const NormalModal = () => {
  const { dict } = useTranslation();
  const [journeysNormal, setJourneysNormal] = useState<JourneyData[] | null>(
    null
  );
  const [selectedTab, setSelectedTab] = useState<MenuTab>(MenuTab.journey);
  useEffect(() => {
    fetchJourneyNormal(setJourneysNormal);
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="container">{dict["home.switch.button"]}</Button>
      </DialogTrigger>
      <DialogContent
        className="w-[800px]"
        style={{ height: "calc(100vh - 50px)" }}
      >
        <Tabs defaultValue={MenuTab.journey} className="flex flex-col">
          <TabsList className="grid w-full grid-cols-3 bg-grayLight">
            <TabsTrigger
              value={MenuTab.journey}
              onClick={() => {
                setSelectedTab(MenuTab.journey);
                fetchJourneyNormal(setJourneysNormal);
              }}
            >
              {dict["home.tabs.journey"]}
            </TabsTrigger>
            <TabsTrigger
              value={MenuTab.recently}
              onClick={() => {
                setSelectedTab(MenuTab.recently);
                fetchRecentlyNormal(setJourneysNormal);
              }}
            >
              {dict["home.tabs.recently"]}
            </TabsTrigger>
            <TabsTrigger
              value={MenuTab.search}
              onClick={() => {
                setSelectedTab(MenuTab.search);
                setJourneysNormal(null);
              }}
            >
              {dict["home.tabs.search"]}
            </TabsTrigger>
          </TabsList>
          <TabsContent value={MenuTab.journey}>
            <JourneyModalCollection journeysNormal={journeysNormal} />
          </TabsContent>
          <TabsContent
            value={MenuTab.recently}
            className={`${
              selectedTab === MenuTab.recently
                ? "flex flex-col flex-1 mt-6"
                : ""
            }`}
          >
            <PathCardRecentlyCollection journeysNormal={journeysNormal} />
          </TabsContent>
          <TabsContent
            value={MenuTab.search}
            className={`${
              selectedTab === MenuTab.search ? "flex flex-col flex-1" : ""
            }`}
          >
            <PathCardSearchCollection
              setJourneysNormal={setJourneysNormal}
              journeysNormal={journeysNormal}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
export default NormalModal;
