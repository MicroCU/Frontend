"use client";
import { useTranslation } from "@/context/Translation";
import { useDebounce } from "@/hooks/Debounce";
import { fetchSearch } from "@/mock/api";
import { ErrorAPI, JourneyStoreData } from "@/types/type";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";

export interface SearchInputNormalProps {
  className?: string;
  defaultValue?: string;
  setJourneys: Dispatch<SetStateAction<JourneyStoreData | null>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<ErrorAPI | null>>;
}

export default function SearchInputNormal({
  className,
  defaultValue,
  setJourneys,
  searchValue,
  setSearchValue,
  setError
}: SearchInputNormalProps) {
  const { dict } = useTranslation();
  const debouncedSearch = useDebounce<string>(searchValue, 1000);
  useEffect(() => {
    if (!debouncedSearch) return;
    fetchSearch(setJourneys, debouncedSearch.trim(), setError);
  }, [debouncedSearch]);

  return (
    <div
      className={`flex flex-row gap-x-4 px-3 py-2 mt-3 mb-6 items-center justify-center bg-white border border-graySmall text-grayMain rounded-md h-9 ${className}`}
    >
      <Search size={14} strokeWidth={2} className="stroke-grayMain" />
      <input
        className="w-full h-full text-grayMain focus:outline-none focus:border-transparent placeholder:text-grayMain Reg14"
        placeholder={dict["home.searchbar.placeholder"]}
        defaultValue={defaultValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
    </div>
  );
}
