"use client";
import { MenuTab } from "@/types/enum";
import NoResult from "./NoResult";
import PathCard from "./PathCard";
import { ErrorAPI, JourneyStoreData } from "@/types/type";
import { Dispatch, SetStateAction, useState } from "react";
import PathCardLoading from "./PathCardLoading";
import SearchInput from "./SearchInput";
import { checkIsDataFieldsValid } from "@/lib/utils";

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
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  return (
    <div className="mt-4">
      <SearchInput
        setJourneys={setJourneysNormal}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        setError={setError}
      />
      <div
        className="space-y-6 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 210px)" }}
      >
        {!journeysNormal && searchKeyword != "" && (
          <PathCardLoading count={4} />
        )}
        {checkIsDataFieldsValid(journeysNormal) &&
          journeysNormal!.data[0].paths.data.map((path) => (
            <div key={path.id}>
              <PathCard path={path} />
            </div>
          ))}
      </div>
      {checkIsDataFieldsValid(journeysNormal) &&
        journeysNormal!.data[0].paths.data.length === 0 && (
          <NoResult type={MenuTab.search} />
        )}
    </div>
  );
}
