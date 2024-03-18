"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useTranslation } from "@/context/Translation";
import { MenuTab } from "@/types/enum";
import { ReactNode } from "react";
import I18nTypo from "./ui/i18nTypo";

export interface NavToolTipProps {
  children: ReactNode;
  tooltipType: string;
}
export default function NavToolTip({ children, tooltipType }: NavToolTipProps) {
  const { dict } = useTranslation();
  let tooltipShowText = "";
  switch (tooltipType) {
    case MenuTab.journey:
      tooltipShowText = dict["home.tabs.journey"];
      break;
    case MenuTab.search:
      tooltipShowText = dict["home.tabs.search"];
      break;
    case MenuTab.recently:
      tooltipShowText = dict["home.tabs.recently"];
      break;
  }
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger> {children} </TooltipTrigger>
        <TooltipContent side="right">
          <I18nTypo> {tooltipShowText} </I18nTypo>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
