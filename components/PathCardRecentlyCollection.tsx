import { MenuTab } from "@/types/enum";
import NoResult from "./NoResult";
import PathCard from "./PathCard";
import PathCardLoading from "./PathCardLoading";
import { useJourneyNormal } from "@/context/JourneysNormal";

export default function PathCardRecentlyCollection() {
  const { journeys } = useJourneyNormal();

  if (!journeys) {
    return <PathCardLoading count={4} />;
  }

  return (
    <>
      <div
        className="space-y-6 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 160px)" }}
      >
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
    </>
  );
}
