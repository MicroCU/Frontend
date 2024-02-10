import JourneyModalItems from "./JourneyModalItems";
import JourneyModalItemsLoading from "./JourneyModalItemsLoading";
import { useJourneyNormal } from "@/context/JourneysNormal";

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
    <div
      className="space-y-6 overflow-y-auto mt-6"
      style={{ maxHeight: "calc(100vh - 160px)" }}
    >
      {journeys &&
        journeys.map((journey) => (
          <JourneyModalItems key={journey.id} journey={journey} />
        ))}
    </div>
  );
}
