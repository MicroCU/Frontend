import { JourneyData } from "@/types/type";
import JourneyModalItems, { JourneyModalType } from "./JourneyModalItems";

interface JourneyModalItemsProps {
  journeysNormal: JourneyData[] | null;
}

export default function JourneyModalCollection({
  journeysNormal
}: JourneyModalItemsProps) {
  return (
    <div
      className="space-y-6 overflow-y-auto mt-6"
      style={{ maxHeight: "calc(100vh - 160px)" }}
    >
      {journeysNormal &&
        journeysNormal.map((journey) => (
          <JourneyModalItems
            key={journey.id}
            journey={journey}
            type={JourneyModalType.Shown}
          />
        ))}
    </div>
  );
}
