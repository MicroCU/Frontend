import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

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
        "flex flex-row justify-between items-center px-3 py-2 min-h-[35px]",
        isSelected
          ? "bg-primary text-white rounded-lg Medium16"
          : "Reg16 text-grayMain",
        className
      )}
    >
      <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
        {name}
      </p>
      {isSelected && <ChevronRight />}
    </div>
  );
}
