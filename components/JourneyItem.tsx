"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import PathItems from "./PathItems";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { JourneyData } from "@/types/type";
import { getPathDetailFromId, isPathInJourney } from "@/mock/common";
import { useJourneyGraph } from "@/context/JourneysGraph";
import I18nTypo from "./ui/I18nTypo";

export default function JourneyItem({ id, name, paths }: JourneyData) {
  const { journeys, selectedPath, setSelectedPath } = useJourneyGraph();
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (selectedPath && isPathInJourney(selectedPath.id, id, journeys)) {
      setOpen(true);
    }
  }, [selectedPath]);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="max-w-60">
      <CollapsibleTrigger className="text-black Bold16 uppercase">
        <div className="flex flex-row gap-x-4 justify-start text-start items-center">
          <div>
            {open ? (
              <ChevronDown className="h-4 w-4" strokeWidth={3} size={16} />
            ) : (
              <ChevronRight className="h-4 w-4" strokeWidth={3} size={16} />
            )}
          </div>
          <span className="break-words max-w-60">
            <I18nTypo>{name}</I18nTypo>
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {paths.data.map((path, index) => (
          <div
            key={path.id}
            onClick={() => {
              setSelectedPath(getPathDetailFromId(path.id, journeys));
            }}
            className={cn(
              "ml-5",
              index !== paths.data.length - 1 ? "my-2" : ""
            )}
          >
            <PathItems
              name={path.name}
              isSelected={selectedPath?.id === path.id}
            />
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
