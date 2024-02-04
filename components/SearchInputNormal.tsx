"use client";
import { useTranslation } from "@/context/Translation";
import { convertSearchToJourney } from "@/mock/search_data";
import { JourneyData } from "@/types/type";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export interface SearchInputNormalProps {
  className?: string;
  defaultValue?: string;
  setJourneys: Dispatch<SetStateAction<JourneyData[] | null>>;
}

export default function SearchInputNormal({
  className,
  defaultValue,
  setJourneys
}: SearchInputNormalProps) {
  const { dict } = useTranslation();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
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
          setSearchKeyword(e.target.value);
          setJourneys(convertSearchToJourney(e.target.value).data);
        }}
      />
    </div>
  );
}
