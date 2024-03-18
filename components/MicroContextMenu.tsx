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
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-fit">{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={handleViewContent}>
          {microType === MicroType.Video
            ? dict["micro.contextMenu.video"]
            : microType === MicroType.Practice
            ? dict["micro.contextMenu.practice"]
            : dict["micro.contextMenu.test"]}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset onClick={handleMarketComplete}>
          {dict["micro.contextMenu.markedComplete"]}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}