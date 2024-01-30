"use client";
import { ListTodo } from "lucide-react";
import { CheckListItem } from "./CheckListItem";
import CheckListItemLoading from "./CheckListItemLoading";
import { CheckListItemStatus } from "@/types/enum";
import { ScrollArea } from "./ui/scroll-area";
import { useJourney } from "@/context/Journeys";

export interface ICheckListProps {
  status: CheckListItemStatus;
  className?: string;
}

export default function CheckList({ status, className }: ICheckListProps) {
  const { journeys } = useJourney();
  return (
    <ScrollArea className="h-96 w-fit rounded-lg">
      <div
        className={`flex flex-col gap-y-4 bg-white p-6 rounded-lg w-[250px] overflow-y-auto effect-default ${className}`}
      >
        <div className="flex items-center gap-x-1">
          <ListTodo size={24} className="stroke-primary" />
          <p className="Bold24 text-primary"> Checklist </p>
        </div>
        {status === CheckListItemStatus.COMPLETED ? (
          <div className="w-[200px] h-full flex justify-center items-center">
            <p className="Reg12"> All Journeys are accomplished </p>
          </div>
        ) : status === CheckListItemStatus.LOADING ? (
          <CheckListItemLoading />
        ) : (
          journeys &&
          journeys.map((journey, index) => (
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
