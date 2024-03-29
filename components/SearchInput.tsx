"use client";
import { useTranslation } from "@/context/Translation";
import { useDebounce } from "@/hooks/Debounce";
import { cn } from "@/lib/utils";
import { BriefPathInfo } from "@/types/type";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface SearchInputProps {
  className?: string;
  defaultValue?: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  setSelectedPath?: Dispatch<SetStateAction<BriefPathInfo | null>>;
}

export default function SearchInput({
  className,
  defaultValue,
  setSearchKeyword,
  setSelectedPath
}: SearchInputProps) {
  const { dict } = useTranslation();

  const [value, setValue] = useState<string>("");
  const debouncedSearch = useDebounce<string>(value, 1000);

  useEffect(() => {
    if (!debouncedSearch) return;
    setSelectedPath && setSelectedPath(null);
    setSearchKeyword(debouncedSearch);
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
          setValue(e.target.value.trim());
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSelectedPath && setSelectedPath(null);
            setSearchKeyword(value);
          }
        }}
      />
    </div>
  );
}
