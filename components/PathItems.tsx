import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import I18nTypo from "./ui/I18nTypo";

export interface PathItemsProps {
  name: string;
  isSelected: boolean;
  className?: string;
}

export default function PathItems({
  name,
  isSelected,
  className
}: PathItemsProps) {
  return (
    <div
      className={cn(
        "flex flex-row justify-between items-center px-3 min-h-[35px] cursor-pointer",
        isSelected
          ? "bg-primary text-white rounded-lg Medium16"
          : "Reg16 text-grayMain",
        className
      )}
    >
      <I18nTypo className="overflow-hidden whitespace-nowrap overflow-ellipsis">
        {name}
      </I18nTypo>
      {isSelected && <ChevronRight />}
    </div>
  );
}
