"use client";
import { useTranslation } from "@/context/Translation";
import { fetchSearchNormal } from "@/mock/api";
import { JourneyData } from "@/types/type";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export interface SearchInputNormalProps {
  className?: string;
  defaultValue?: string;
  setJourneys: Dispatch<SetStateAction<JourneyData[] | null>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export default function SearchInputNormal({
  className,
  defaultValue,
  setJourneys,
  setSearchValue
}: SearchInputNormalProps) {
  const { dict } = useTranslation();

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
          if (e.target.value === "") {
            setJourneys(null);
          } else {
            fetchSearchNormal(setJourneys, e.target.value);
          }
        }}
      />
    </div>
  );
}
