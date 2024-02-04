import { JourneyData } from "@/types/type";
import JourneyModalItems from "./JourneyModalItems";
import JourneyModalItemsLoading from "./JourneyModalItemsLoading";

interface JourneyModalItemsProps {
  journeysNormal: JourneyData[] | null;
}

export default function JourneyModalCollection({
  journeysNormal
}: JourneyModalItemsProps) {
  if (journeysNormal == null) {
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
      {journeysNormal &&
        journeysNormal.map((journey) => (
          <JourneyModalItems key={journey.id} journey={journey} />
        ))}
    </div>
  );
}
