import { ListTodo } from "lucide-react";
import { CheckListItem, ICheckListItem } from "./CheckListItem";
import CheckListItemLoading from "./CheckListItemLoading";
import { CheckListItemStatus } from "@/types/enum";
import { ScrollArea } from "./ui/scroll-area";

export interface ICheckListProps {
  checkListItems: ICheckListItem[];
  status: CheckListItemStatus;
  className?: string;
}

export default function CheckList({
  checkListItems,
  status,
  className
}: ICheckListProps) {
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
          checkListItems.map((checkListItem, index) => (
            <CheckListItem
              key={index}
              journey={checkListItem.journey}
              paths={checkListItem.paths}
              progress={checkListItem.progress}
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
}
