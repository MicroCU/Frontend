import { MenuTab } from "@/types/enum";
import { JourneyData } from "@/types/type";
import NoResult from "./NoResult";
import PathCard from "./PathCard";
import PathCardLoading from "./PathCardLoading";

interface PathCardRecentlyCollectionProps {
  journeysNormal: JourneyData[] | null;
}

export default function PathCardRecentlyCollection({
  journeysNormal
}: PathCardRecentlyCollectionProps) {
  if (!journeysNormal) {
    const loadingItems = Array.from({ length: 4 });
    return (
      <>
        {loadingItems.map((_, index) => (
          <div key={index} className="py-3">
            <PathCardLoading />
          </div>
        ))}
      </>
    );
  }
  return (
    <>
      <div
        className="space-y-6 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 160px)" }}
      >
        {journeysNormal &&
          journeysNormal.length > 0 &&
          journeysNormal[0].paths.data.map((path) => (
            <div key={path.id}>
              <PathCard path={path} />
            </div>
          ))}
      </div>
      {journeysNormal && journeysNormal[0].paths.data.length === 0 && (
        <NoResult type={MenuTab.recently} />
      )}
    </>
  );
}
