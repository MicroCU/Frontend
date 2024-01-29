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
}

export default function JourneyItem({ id, name, paths }: JourneyItemProps) {
  const { selectedPath, setSelectedPath } = useSelectedPath();
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (selectedPath && isPathInJourney(selectedPath.id, id)) {
      setOpen(true);
    }
  }, [selectedPath]);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="max-w-72">
      <CollapsibleTrigger className="text-black Bold16 uppercase">
        <div className="flex flex-row gap-x-4 justify-start text-start items-center">
          <div>
            {open ? (
              <ChevronDown className="h-4 w-4" strokeWidth={3} size={16} />
            ) : (
              <ChevronRight className="h-4 w-4" strokeWidth={3} size={16} />
            )}
          </div>
          <span className="break-words max-w-64">{name}</span>
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
