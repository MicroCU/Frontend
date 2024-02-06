"use client";
import { MenuTab } from "@/types/enum";
import { LibraryBig, Search, History } from "lucide-react";
import { useState } from "react";
import NavToolTip from "./NavToolTip";
import { cn } from "@/lib/utils";

export interface TabIcon {
  type: MenuTab;
  className?: string;
}

export default function TabIcon({ type, className }: TabIcon) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <NavToolTip tooltipType={type}>
      <div
        className={cn(
          "w-8 h-8 rounded flex justify-center items-center",
          isHovered ? "bg-grayMain" : "",
          className
        )}
      >
        {type === MenuTab.journey ? (
          <LibraryBig
            className={cn(isHovered ? "stroke-grayLight" : "stroke-grayMain")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        ) : type === MenuTab.search ? (
          <Search
            size={28}
            strokeWidth={2}
            className={cn(isHovered ? "stroke-grayLight" : "stroke-grayMain")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        ) : (
          <History
            className={cn(isHovered ? "stroke-grayLight" : "stroke-grayMain")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        )}
      </div>
    </NavToolTip>
  );
}
