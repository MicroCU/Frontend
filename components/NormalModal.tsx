"use client";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { useTranslation } from "@/context/Translation";
import { MenuTab } from "@/types/enum";
import JourneyModalCollection from "./JourneyModalCollection";
import PathCardRecentlyCollection from "./PathCardRecentlyCollection";
import PathCardSearchCollection from "./PathCardSearchCollection";
import { cn } from "@/lib/utils";
import { useJourneyNormal } from "@/context/JourneysNormal";

const NormalModal = () => {
  const { dict } = useTranslation();
  const { journeys, selectedTab, setSelectedTab } =
    useJourneyNormal();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="container">{dict["home.switch.button"]}</Button>
      </DialogTrigger>
      <DialogContent
        className="w-[800px]"
        style={{ height: "calc(100vh - 50px)" }}
      >
        <Tabs defaultValue={selectedTab} className="flex flex-col">
          <TabsList className="grid w-full grid-cols-3 bg-grayLight">
            <TabsTrigger
              value={MenuTab.journey}
              onClick={() => {
                setSelectedTab(MenuTab.journey);
              }}
              disabled={!journeys}
            >
              {dict["home.tabs.journey"]}
            </TabsTrigger>
            <TabsTrigger
              value={MenuTab.recently}
              onClick={() => {
                setSelectedTab(MenuTab.recently);
              }}
              disabled={!journeys}
            >
              {dict["home.tabs.recently"]}
            </TabsTrigger>
            <TabsTrigger
              value={MenuTab.search}
              onClick={() => {
                setSelectedTab(MenuTab.search);
              }}
              disabled={!journeys}
            >
              {dict["home.tabs.search"]}
            </TabsTrigger>
          </TabsList>
          <TabsContent value={MenuTab.journey}>
            <JourneyModalCollection />
          </TabsContent>
          <TabsContent
            value={MenuTab.recently}
            className={cn(
              selectedTab === MenuTab.recently
                ? "flex flex-col flex-1 mt-6"
                : ""
            )}
          >
            <PathCardRecentlyCollection />
          </TabsContent>
          <TabsContent
            value={MenuTab.search}
            className={cn(
              selectedTab === MenuTab.search ? "flex flex-col flex-1" : ""
            )}
          >
            <PathCardSearchCollection />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
export default NormalModal;
