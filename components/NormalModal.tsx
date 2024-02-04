"use client";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import JourneyModalItems, { JourneyModalType } from "./JourneyModalItems";
import { useTranslation } from "@/context/Translation";
import { MenuTab } from "@/types/enum";
import { MockHomeData } from "@/mock/journey_data";
import { useEffect, useState } from "react";
import PathCard, { PathCardType } from "./PathCard";
import { convertRecentlyToJourney } from "@/mock/recently_data";
import { JourneyData } from "@/types/type";
import SearchInputNormal from "./SearchInputNormal";

const NormalModal = () => {
  const { dict } = useTranslation();
  const [journeysNormal, setJourneysNormal] = useState<JourneyData[] | null>(
    null
  );
  useEffect(() => {
    setJourneysNormal(MockHomeData.journeys);
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="container">{dict["home.switch.button"]}</Button>
      </DialogTrigger>
      <DialogContent className="w-[800px] h-[800px]">
        <Tabs defaultValue={MenuTab.journey} className="flex-1">
          <TabsList className="grid w-full grid-cols-3 bg-grayLight mb-6">
            <TabsTrigger
              value={MenuTab.journey}
              onClick={() => {
                setJourneysNormal(MockHomeData.journeys);
              }}
            >
              {dict["home.tabs.journey"]}
            </TabsTrigger>
            <TabsTrigger
              value={MenuTab.recently}
              onClick={() => {
                setJourneysNormal(convertRecentlyToJourney().data);
              }}
            >
              {dict["home.tabs.recently"]}
            </TabsTrigger>
            <TabsTrigger
              value={MenuTab.search}
              onClick={() => {
                setJourneysNormal(null);
              }}
            >
              {dict["home.tabs.search"]}
            </TabsTrigger>
          </TabsList>
          <TabsContent value={MenuTab.journey}>
            <div className="space-y-6 max-h-[690px] overflow-y-auto">
              {journeysNormal &&
                journeysNormal.map((journey) => (
                  <JourneyModalItems
                    key={journey.id}
                    journey={journey}
                    type={JourneyModalType.Shown}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value={MenuTab.recently}>
            <div className="space-y-6 max-h-[690px] overflow-y-auto">
              {journeysNormal &&
                journeysNormal.length > 0 &&
                journeysNormal[0].paths.data.map((path) => (
                  <div key={path.id}>
                    <PathCard path={path} type={PathCardType.Shown} />
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value={MenuTab.search}>
            <SearchInputNormal setJourneys={setJourneysNormal} />
            <div className="space-y-6 max-h-[625px] overflow-y-auto">
              {journeysNormal &&
                journeysNormal.length > 0 &&
                journeysNormal[0].paths.data.map((path) => (
                  <div key={path.id}>
                    <PathCard path={path} type={PathCardType.Shown} />
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
export default NormalModal;
