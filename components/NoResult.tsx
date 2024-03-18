"use client";
import { useJourneyGraph } from "@/context/JourneysGraph";
import { useJourneyNormal } from "@/context/JourneysNormal";
import { useTranslation } from "@/context/Translation";
import { MenuTab } from "@/types/enum";
import { History, SearchX } from "lucide-react";
import I18nTypo from "./ui/I18nTypo";

export interface NoResult {
  type: MenuTab;
}

export default function NoResult({ type }: NoResult) {
  const { dict } = useTranslation();
  const { searchKeyword: SearchKeywordGraph } = useJourneyGraph();
  const { searchKeyword: SearchKeywordNormal } = useJourneyNormal();
  return (
    <div className="flex flex-col h-full gap-y-2 justify-center items-center text-grayMain Medium16">
      {type === MenuTab.recently && (
        <>
          <History className="stroke-grayMain w-8 h-8" />
          <I18nTypo> {dict["home.recently.noresult"]} </I18nTypo>
        </>
      )}
      {type === MenuTab.search &&
        (SearchKeywordGraph != "" || SearchKeywordNormal != "") && (
          <>
            <SearchX className="stroke-grayMain w-8 h-8" />
            <I18nTypo> {dict["home.searchbar.noresult"]} </I18nTypo>
          </>
        )}
    </div>
  );
}
