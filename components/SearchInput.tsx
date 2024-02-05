"use client";
import { useJourney } from "@/context/Journeys";
import { useTranslation } from "@/context/Translation";
import { useDebounce } from "@/hooks/Debounce";
import { fetchSearch } from "@/mock/api";
import { Search } from "lucide-react";
import { useEffect } from "react";

export interface SearchInputProps {
  className?: string;
  defaultValue?: string;
}

export default function SearchInput({
  className,
  defaultValue
}: SearchInputProps) {
  const { dict } = useTranslation();
  const { searchKeyword, setSearchKeyword, setJourneys, setError } =
    useJourney();
  const debouncedSearch = useDebounce<string>(searchKeyword, 1000);
  useEffect(() => {
    if (!debouncedSearch) return;
    fetchSearch(setJourneys, debouncedSearch.trim(), setError);
  }, [debouncedSearch]);

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
          setSearchKeyword(e.target.value.trim());
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchSearch(setJourneys, searchKeyword, setError);
          }
        }}
      />
    </div>
  );
}
