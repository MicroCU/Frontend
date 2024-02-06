import { MenuTab } from "@/types/enum";
import NoResult from "./NoResult";
import PathCard from "./PathCard";
import PathCardLoading from "./PathCardLoading";
import { JourneyStoreData } from "@/types/type";
import { checkIsDataFieldsValid } from "@/lib/utils";

interface PathCardRecentlyCollectionProps {
  journeysNormal: JourneyStoreData | null;
}

export default function PathCardRecentlyCollection({
  journeysNormal
}: PathCardRecentlyCollectionProps) {
  if (!journeysNormal) {
    return <PathCardLoading count={4} />;
  }

  return (
    <>
      <div
        className="space-y-6 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 160px)" }}
      >
        {checkIsDataFieldsValid(journeysNormal) &&
          journeysNormal.data[0].paths.data.map((path) => (
            <div key={path.id}>
              <PathCard path={path} />
            </div>
          ))}
      </div>
      {checkIsDataFieldsValid(journeysNormal) &&
        journeysNormal.data[0].paths.data.length === 0 && (
          <NoResult type={MenuTab.recently} />
        )}
    </>
  );
}
