"use client";
import { ListTodo } from "lucide-react";
import { CheckListItem } from "./CheckListItem";
import CheckListItemLoading from "./CheckListItemLoading";
import { ScrollArea } from "./ui/scroll-area";
import { useJourney } from "@/context/Journeys";
import { useTranslation } from "@/context/Translation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { JourneyStoreData } from "@/types/type";
import { MenuTab } from "@/types/enum";

export interface ICheckListProps {
  className?: string;
}

export default function CheckList({ className }: ICheckListProps) {
  const { journeys, selectedTab, searchKeyword } = useJourney();
  const { dict } = useTranslation();

  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  useEffect(() => {
    if (containerRef.current) {
      const elementHeight = containerRef.current.getBoundingClientRect().height;

      setIsOverflow(elementHeight > 384);
    }
  }, [journeys]);

  return (
    <ScrollArea
      className={cn(
        "h-96 w-full rounded-lg",
        isOverflow ? "effect-default" : ""
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-y-4 bg-white p-6 rounded-lg w-[250px] overflow-y-auto effect-default",
          className
        )}
        ref={containerRef}
      >
        <div className="flex items-center gap-x-1">
          <ListTodo size={24} className="stroke-primary" />
          <p className="Bold24 text-primary">{dict["home.checklist.title"]}</p>
        </div>
        {journeys && checkIfAllCompleted(journeys) ? (
          <div className="w-[200px] h-full flex justify-center items-center">
            <p className="Reg12"> {dict["home.checklist.complete"]} </p>
          </div>
        ) : (!journeys && selectedTab != MenuTab.search) ||
          (!journeys &&
            selectedTab == MenuTab.search &&
            searchKeyword != "") ? (
          <CheckListItemLoading />
        ) : (
          journeys &&
          journeys.data &&
          journeys.data.map((journey, index) => (
            <CheckListItem
              key={index}
              journeyName={journey.name}
              paths={journey.paths.data.map((path) => path.name)}
              progress={journey.progress}
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
}

function checkIfAllCompleted(journeys: JourneyStoreData) {
  return (
    journeys.data && journeys.data.every((journey) => journey.progress === 100)
  );
}
