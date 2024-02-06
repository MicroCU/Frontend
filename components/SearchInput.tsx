"use client";
import { useTranslation } from "@/context/Translation";
import { useDebounce } from "@/hooks/Debounce";
import { cn } from "@/lib/utils";
import { fetchSearchForNormal } from "@/mock/api";
import { JourneyStoreData, ErrorAPI, BriefPathInfo } from "@/types/type";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";

export interface SearchInputProps {
  className?: string;
  defaultValue?: string;
  setJourneys: Dispatch<SetStateAction<JourneyStoreData | null>>;
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<ErrorAPI | null>>;
  setSelectedPath?: Dispatch<SetStateAction<BriefPathInfo | null>>;
}

export default function SearchInput({
  className,
  defaultValue,
  setJourneys,
  searchKeyword,
  setSearchKeyword,
  setError,
  setSelectedPath
}: SearchInputProps) {
  const { dict } = useTranslation();
  const debouncedSearch = useDebounce<string>(searchKeyword, 1000);
  useEffect(() => {
    if (!debouncedSearch) return;
    setSelectedPath && setSelectedPath(null);
    fetchSearchForNormal(setJourneys, debouncedSearch.trim(), setError);
  }, [debouncedSearch]);

  return (
    <div
      className={cn(
        "flex flex-row gap-x-4 mb-4 px-3 py-2 items-center justify-center bg-white border border-graySmall text-grayMain rounded-md h-9",
        className
      )}
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
            setSelectedPath && setSelectedPath(null);
            fetchSearchForNormal(setJourneys, searchKeyword, setError);
          }
        }}
      />
    </div>
  );
}
