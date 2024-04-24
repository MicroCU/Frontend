"use client";
import { MenuTab } from "@/types/enum";
import NoResult from "./NoResult";
import PathCard from "./PathCard";
import PathCardLoading from "./PathCardLoading";
import SearchInput from "./SearchInput";
import { useJourneyNormal } from "@/context/JourneysNormal";
import { ScrollArea } from "./ui/scroll-area";

export default function PathCardSearchCollection() {
  const { journeys, searchKeyword, setSearchKeyword } = useJourneyNormal();

  return (
    <div className="mt-4 h-full">
      <SearchInput setSearchKeyword={setSearchKeyword} />
      {journeys &&
      journeys.length > 0 &&
      journeys[0].paths.data.length === 0 ? (
        <NoResult type={MenuTab.search} />
      ) : (
        <ScrollArea
          className="w-full"
          style={{ height: "calc(100vh - 210px)" }}
        >
          <div className="space-y-6">
            {!journeys && searchKeyword != "" && <PathCardLoading count={4} />}
            {journeys &&
              journeys.length > 0 &&
              journeys[0].paths.data.map((path) => (
                <div key={path.id}>
                  <PathCard path={path} />
                </div>
              ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
