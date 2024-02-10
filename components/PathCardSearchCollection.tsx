"use client";
import { MenuTab } from "@/types/enum";
import NoResult from "./NoResult";
import PathCard from "./PathCard";
import PathCardLoading from "./PathCardLoading";
import SearchInput from "./SearchInput";
import { useJourneyNormal } from "@/context/JourneysNormal";

export default function PathCardSearchCollection() {
  const { journeys, searchKeyword, setSearchKeyword } = useJourneyNormal();

  return (
    <div className="mt-4">
      <SearchInput setSearchKeyword={setSearchKeyword} />
      <div
        className="space-y-6 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 210px)" }}
      >
        {!journeys && searchKeyword != "" && <PathCardLoading count={4} />}
        {journeys &&
          journeys.length > 0 &&
          journeys[0].paths.data.map((path) => (
            <div key={path.id}>
              <PathCard path={path} />
            </div>
          ))}
      </div>
      {journeys &&
        journeys.length > 0 &&
        journeys[0].paths.data.length === 0 && (
          <NoResult type={MenuTab.search} />
        )}
    </div>
  );
}
