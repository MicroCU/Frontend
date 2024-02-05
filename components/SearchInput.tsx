"use client";
import { useJourney } from "@/context/Journeys";
import { useTranslation } from "@/context/Translation";
import { fetchSearchGraph } from "@/mock/api";
import { Search } from "lucide-react";

export interface SearchInputProps {
  className?: string;
  defaultValue?: string;
}

export default function SearchInput({
  className,
  defaultValue
}: SearchInputProps) {
  const { dict } = useTranslation();
  const { setSearchKeyword, setJourneys, setError } = useJourney();
  return (
    <div
      className={`flex flex-row gap-x-4 mb-4 px-3 py-2 items-center justify-center bg-white border border-graySmall text-grayMain rounded-md h-9 ${className}`}
    >
      <Search size={14} strokeWidth={2} className="stroke-grayMain" />
      <input
        className="w-full h-full text-grayMain focus:outline-none focus:border-transparent placeholder:text-grayMain Reg14"
        placeholder={dict["home.searchbar.placeholder"]}
        defaultValue={defaultValue}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
          fetchSearchGraph(setJourneys, e.target.value, setError);
        }}
      />
    </div>
  );
}
