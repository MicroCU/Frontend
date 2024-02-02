"use client";
import { useJourney } from "@/context/Journeys";
import { useTranslation } from "@/context/Translation";
import { convertSearchToJourney } from "@/mock/search_data";
import { Search } from "lucide-react";

export interface ISearchInput {
  className?: string;
  defaultValue?: string;
}

export default function SearchInput({ className, defaultValue }: ISearchInput) {
  const { dict } = useTranslation();
  const { setSearchKeyword, setJourneys } = useJourney();
  return (
    <div
      className={`flex flex-row gap-x-4 px-3 py-2 items-center justify-center bg-white border border-graySmall text-grayMain rounded-md h-9 ${className}`}
    >
      <Search size={14} strokeWidth={2} className="stroke-grayMain" />
      <input
        className="w-full h-full text-grayMain focus:outline-none focus:border-transparent placeholder:text-grayMain Reg14"
        placeholder={dict["home.searchbar.placeholder"]}
        defaultValue={defaultValue}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
          setJourneys(convertSearchToJourney(e.target.value));
        }}
      />
    </div>
  );
}
