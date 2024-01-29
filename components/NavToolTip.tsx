import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

export interface NavToolTipProps {
  children: ReactNode;
  tooltipText: string;
}
export default function NavToolTip({ children, tooltipText }: NavToolTipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger> {children} </TooltipTrigger>
        <TooltipContent side="right">
          <p> {tooltipText} </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
