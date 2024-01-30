"use client";
import { MenuTab } from "@/types/enum";
import { LibraryBig, Search, History } from "lucide-react";
import { useState } from "react";
import NavToolTip from "./NavToolTip";

export interface ITabIcon {
  type: MenuTab;
  className?: string;
}

export default function TabIcon({ type, className }: ITabIcon) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <NavToolTip tooltipText={type}>
      <div
        className={`w-8 h-8 rounded flex justify-center items-center ${
          isHovered ? "bg-grayMain" : ""
        } ${className}`}
      >
        {type === MenuTab.journey ? (
          <LibraryBig
            className={`${isHovered ? "stroke-grayLight" : "stroke-grayMain"}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        ) : type === MenuTab.search ? (
          <Search
            size={28}
            strokeWidth={2}
            className={`${isHovered ? "stroke-grayLight" : "stroke-grayMain"}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        ) : (
          <History
            className={`${isHovered ? "stroke-grayLight" : "stroke-grayMain"}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        )}
      </div>
    </NavToolTip>
  );
}
