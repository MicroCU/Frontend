import { History, SearchX } from "lucide-react";

export enum NoResultTypeEnum {
  NoRecentlyPaths = "No recently paths",
  NoResultsFound = "No results found"
}

export interface NoResult {
  type: NoResultTypeEnum;
}

export default function NoResult({ type }: NoResult) {
  return (
    <div className="flex flex-col gap-y-2 justify-center items-center text-grayMain Medium16">
      {type === NoResultTypeEnum.NoRecentlyPaths && (
        <>
          <History className="stroke-grayMain w-8 h-8" />
          <p> {type} </p>
        </>
      )}
      {type === NoResultTypeEnum.NoResultsFound && (
        <>
          <SearchX className="stroke-grayMain w-8 h-8" />
          <p> {type} </p>
        </>
      )}
    </div>
  );
}
