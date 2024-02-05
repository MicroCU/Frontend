"use client";
import { MenuTab } from "@/types/enum";
import NoResult from "./NoResult";
import PathCard from "./PathCard";
import SearchInputNormal from "./SearchInputNormal";
import { ErrorAPI, JourneyStoreData } from "@/types/type";
import { Dispatch, SetStateAction, useState } from "react";
import PathCardLoading from "./PathCardLoading";

interface PathCardSearchCollectionProps {
  setJourneysNormal: Dispatch<SetStateAction<JourneyStoreData | null>>;
  journeysNormal: JourneyStoreData | null;
  setError: Dispatch<SetStateAction<ErrorAPI | null>>;
}

export default function PathCardSearchCollection({
  setJourneysNormal,
  journeysNormal,
  setError
}: PathCardSearchCollectionProps) {
  const loadingItems = Array.from({ length: 4 });
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <>
      <SearchInputNormal
        setJourneys={setJourneysNormal}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setError={setError}
      />
      <div
        className="space-y-6 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 210px)" }}
      >
        {!journeysNormal && searchValue != "" && (
          <>
            {loadingItems.map((_, index) => (
              <div key={index}>
                <PathCardLoading />
              </div>
            ))}
          </>
        )}
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
          <NoResult type={MenuTab.search} />
        )}
    </>
  );
}
