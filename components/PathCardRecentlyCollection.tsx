import { MenuTab } from "@/types/enum";
import NoResult from "./NoResult";
import PathCard from "./PathCard";
import PathCardLoading from "./PathCardLoading";
import { useJourneyNormal } from "@/context/JourneysNormal";
import { ScrollArea } from "./ui/scroll-area";

export default function PathCardRecentlyCollection() {
  const { journeys } = useJourneyNormal();

  if (!journeys) {
    return <PathCardLoading count={4} />;
  }

  return (
    <ScrollArea className="w-full" style={{ height: "calc(100vh - 160px)" }}>
      <div className="space-y-6">
        {journeys.length > 0 &&
          journeys[0].paths.data.map((path) => (
            <div key={path.id}>
              <PathCard path={path} />
            </div>
          ))}
      </div>
      {journeys.length > 0 && journeys[0].paths.data.length === 0 && (
        <NoResult type={MenuTab.recently} />
      )}
    </ScrollArea>
  );
}
