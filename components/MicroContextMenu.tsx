import { MicroType } from "@/types/enum";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator
} from "./ui/context-menu";
import { useTranslation } from "@/context/Translation";

interface MicroContextMenuProps {
  children: React.ReactNode;
  microType: MicroType;
}

export default function MicroContextMenu({
  children,
  microType
}: MicroContextMenuProps) {
  const { dict } = useTranslation();
  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-fit">{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64 rounded-lg bg-white shadow-md border border-graySmall">
        <ContextMenuItem inset className="text-grayMain">
          {dict["micro.contextMenu.markedComplete"]}
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-graySmall" />
        <ContextMenuItem inset className="text-grayMain">
          {microType === MicroType.Video
            ? dict["micro.contextMenu.video"]
            : microType === MicroType.Practice
            ? dict["micro.contextMenu.practice"]
            : dict["micro.contextMenu.test"]}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
