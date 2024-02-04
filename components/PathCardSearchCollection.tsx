import { MenuTab } from "@/types/enum";
import NoResult from "./NoResult";
import PathCard, { PathCardType } from "./PathCard";
import SearchInputNormal from "./SearchInputNormal";
import { JourneyData } from "@/types/type";
import { Dispatch, SetStateAction } from "react";

interface PathCardSearchCollectionProps {
  setJourneysNormal: Dispatch<SetStateAction<JourneyData[] | null>>;
  journeysNormal: JourneyData[] | null;
}

export default function PathCardSearchCollection({
  setJourneysNormal,
  journeysNormal
}: PathCardSearchCollectionProps) {
  return (
    <>
      <SearchInputNormal setJourneys={setJourneysNormal} />
      <div
        className="space-y-6 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 210px)" }}
      >
        {journeysNormal &&
          journeysNormal.length > 0 &&
          journeysNormal[0].paths.data.map((path) => (
            <div key={path.id}>
              <PathCard path={path} type={PathCardType.Shown} />
            </div>
          ))}
      </div>
      {journeysNormal && journeysNormal[0].paths.data.length === 0 && (
        <NoResult type={MenuTab.search} />
      )}
    </>
  );
}
