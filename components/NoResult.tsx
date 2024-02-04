"use client";
import { useTranslation } from "@/context/Translation";
import { MenuTab } from "@/types/enum";
import { History, SearchX } from "lucide-react";

export interface NoResult {
  type: MenuTab;
}

export default function NoResult({ type }: NoResult) {
  const { dict } = useTranslation();
  return (
    <div className="flex flex-col h-full gap-y-2 justify-center items-center text-grayMain Medium16">
      {type === MenuTab.recently && (
        <>
          <History className="stroke-grayMain w-8 h-8" />
          <p> {dict["home.recently.noresult"]} </p>
        </>
      )}
      {type === MenuTab.search && (
        <>
          <SearchX className="stroke-grayMain w-8 h-8" />
          <p> {dict["home.searchbar.noresult"]} </p>
        </>
      )}
    </div>
  );
}
