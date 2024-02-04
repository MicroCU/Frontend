"use client";
import { useJourney } from "@/context/Journeys";
import { useTranslation } from "@/context/Translation";
import { convertSearchToJourney } from "@/mock/search_data";
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
  const { setSearchKeyword, setJourneys } = useJourney();
  return (
    <div
      className={`flex flex-row gap-x-4 px-3 py-2 mt-3 items-center justify-center bg-white border border-graySmall text-grayMain rounded-md h-9 ${className}`}
    >
      <Search size={14} strokeWidth={2} className="stroke-grayMain" />
      <input
        className="w-full h-full text-grayMain focus:outline-none focus:border-transparent placeholder:text-grayMain Reg14"
        placeholder={dict["home.searchbar.placeholder"]}
        defaultValue={defaultValue}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
          if (e.target.value === "") {
            setJourneys(null);
          } else {
            setJourneys(convertSearchToJourney(e.target.value));
          }
        }}
      />
    </div>
  );
}
