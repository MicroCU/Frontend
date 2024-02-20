import JourneyModalItems from "./JourneyModalItems";
import JourneyModalItemsLoading from "./JourneyModalItemsLoading";
import { useJourneyNormal } from "@/context/JourneysNormal";
import { ScrollArea } from "./ui/scroll-area";

export default function JourneyModalCollection() {
  const { journeys } = useJourneyNormal();

  if (journeys == null) {
    return (
      <div className="mt-6" style={{ maxHeight: "calc(100vh - 160px)" }}>
        <JourneyModalItemsLoading />
      </div>
    );
  }
  return (
    <ScrollArea className="w-full" style={{ height: "calc(100vh - 160px)" }}>
      <div className="space-y-6 mt-6">
        {journeys &&
          journeys.map((journey) => (
            <JourneyModalItems key={journey.id} journey={journey} />
          ))}
      </div>
    </ScrollArea>
  );
}
