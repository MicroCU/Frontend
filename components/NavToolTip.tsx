import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

export interface NavToolTipProps {
  mainText: string;
  subText: string;
}
export default function NavToolTip({ mainText, subText }: NavToolTipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger> {mainText} </TooltipTrigger>
        <TooltipContent side="right">
          <p> {subText} </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
