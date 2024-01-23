import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

export default function OverflowTooltip({
  text,
  isOverflowing,
  children
}: {
  text: string;
  isOverflowing: boolean;
  children: ReactNode;
}) {
  if (!isOverflowing) {
    return <>{children}</>;
  }
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side="right" className="w-auto">
          <p> {text} </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
