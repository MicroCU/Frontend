import { MicroType } from "@/types/enum";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator
} from "./ui/context-menu";
import { useTranslation } from "@/context/Translation";
import { updateRecentlyPath } from "@/action/path";
import { usePathname, useRouter } from "next/navigation";

interface MicroContextMenuProps {
  children: React.ReactNode;
  id: string;
  microType: MicroType;
  viewport?: { x: number; y: number; zoom: number };
}

export default function MicroContextMenu({
  children,
  id,
  microType,
  viewport
}: MicroContextMenuProps) {
  const { dict } = useTranslation();
  const pathName = usePathname();
  const router = useRouter();
  const handleMarketComplete = () => {
    updateRecentlyPath(id);
    console.log("Marked complete");
  };
  const handleViewContent = () => {
    if (microType === MicroType.Video) {
      localStorage.setItem(
        "pathData",
        JSON.stringify({
          viewport: {
            id: id,
            x: viewport?.x,
            y: viewport?.y,
            zoom: viewport?.zoom
          },
          pathName: pathName
        })
      );
      router.push(`${pathName}/video/${id}`);
    } else if (microType === MicroType.Practice) {
      console.log("View practice content");
    } else {
      console.log("View test content");
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-fit">{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64 rounded-lg bg-white shadow-md border border-graySmall">
        <ContextMenuItem
          inset
          className="text-grayMain hover:bg-graySmall"
          onClick={handleViewContent}
        >
          {microType === MicroType.Video
            ? dict["micro.contextMenu.video"]
            : microType === MicroType.Practice
            ? dict["micro.contextMenu.practice"]
            : dict["micro.contextMenu.test"]}
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-graySmall" />
        <ContextMenuItem
          inset
          className="text-grayMain hover:bg-graySmall"
          onClick={handleMarketComplete}
        >
          {dict["micro.contextMenu.markedComplete"]}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
