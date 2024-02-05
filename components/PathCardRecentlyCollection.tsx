import { MenuTab } from "@/types/enum";
import NoResult from "./NoResult";
import PathCard from "./PathCard";
import PathCardLoading from "./PathCardLoading";
import { JourneyStoreData } from "@/types/type";

interface PathCardRecentlyCollectionProps {
  journeysNormal: JourneyStoreData | null;
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
        className="space-y-6 overflow-y-auto mt-4"
        style={{ maxHeight: "calc(100vh - 160px)" }}
      >
        {journeysNormal &&
          journeysNormal.data &&
          journeysNormal.data.length > 0 &&
          journeysNormal.data[0].paths.data.map((path) => (
            <div key={path.id}>
              <PathCard path={path} />
            </div>
          ))}
      </div>
      {journeysNormal &&
        journeysNormal.data &&
        journeysNormal.data[0] &&
        journeysNormal.data[0].paths.data.length === 0 && (
          <NoResult type={MenuTab.recently} />
        )}
    </>
  );
}
