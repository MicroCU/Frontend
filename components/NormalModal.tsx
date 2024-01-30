"use client";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import JourneyModalItems, { JourneyModalType } from "./JourneyModalItems";
import { useTranslation } from "@/context/Translation";
import { useJourney } from "@/context/Journeys";
import { MenuTab } from "@/types/enum";

const NormalModal = () => {
  const { dict } = useTranslation();
  const { journeys } = useJourney();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="container">{dict["home.switch.button"]}</Button>
      </DialogTrigger>
      <DialogContent>
        <Tabs defaultValue={MenuTab.journey} className="flex-1">
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
            <div className="space-y-6 max-h-[720px] overflow-y-auto">
              {journeys &&
                journeys.map((journey) => (
                  <JourneyModalItems
                    key={journey.id}
                    journey={journey}
                    type={JourneyModalType.Shown}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
export default NormalModal;
