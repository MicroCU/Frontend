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
import { useSelectedPath } from "@/context/SelectedPath";
import { getPathDetailFromId, isPathInJourney } from "@/mock/home_data";

export interface PathItems {
  id: string;
  name: string;
}

export interface JourneyItemProps {
  id: string;
  name: string;
  paths: PathItems[];
  width?: number;
}

export default function JourneyItem({
  id,
  name,
  paths,
  width
}: JourneyItemProps) {
  const { selectedPath, setSelectedPath } = useSelectedPath();
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (selectedPath && isPathInJourney(selectedPath.id, id)) {
      setOpen(true);
    }
  }, [selectedPath]);
  return (
    <Collapsible open={open} onOpenChange={setOpen} style={{ maxWidth: width }}>
      <CollapsibleTrigger className="text-black Bold16 uppercase">
        <div className="flex flex-row gap-x-4 shrink justify-start text-start items-center">
          {open ? (
            <ChevronDown className="h-4 w-4" strokeWidth={3} />
          ) : (
            <ChevronRight className="h-4 w-4" strokeWidth={3} />
          )}
          <span
            className="overflow-hidden whitespace-nowrap overflow-ellipsis"
            style={{ maxWidth: `${width ? width - 32 : width}px` }}
          >
            {name}
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {paths.map((path, index) => (
          <div
            key={path.id}
            onClick={() => {
              setSelectedPath(getPathDetailFromId(path.id));
            }}
            className={cn("ml-5", index !== paths.length - 1 ? "my-2" : "")}
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
