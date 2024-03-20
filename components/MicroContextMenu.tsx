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
import I18nTypo from "./ui/I18nTypo";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { usePath } from "@/context/Path";

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
  const [error, setError] = useState<string | null>(null);
  const { setPathInfo, setSelectedPathId } = usePath();
  const handleMarketComplete = () => {
    const updateToAPI = async () => {
      try {
        const response = await updateRecentlyPath(id);
        if (response?.status == 200) {
          setPathInfo((prev) => {
            if (prev) {
              return {
                ...prev,
                groups: prev.groups.map((group) => {
                  return {
                    ...group,
                    nodes: group.micros.map((node) => {
                      if (node.id === id) {
                        return {
                          ...node,
                          progress: 100
                        };
                      }
                      return node;
                    })
                  };
                })
              };
            }
            return prev;
          });
          setSelectedPathId(id);
        }
        if (response?.status != 200) {
          setError(
            response?.message ? response.message : "Error fetching data"
          );
          return;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    updateToAPI();
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

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Update Progress Error (Mock Only)",
        description: "Cannot save the progress now!"
      });
      setError(null);
    }
  }, [error]);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-fit">{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={handleViewContent}>
          <I18nTypo>
            {microType === MicroType.Video
              ? dict["micro.contextMenu.video"]
              : microType === MicroType.Practice
              ? dict["micro.contextMenu.practice"]
              : dict["micro.contextMenu.test"]}
          </I18nTypo>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset onClick={handleMarketComplete}>
          <I18nTypo>{dict["micro.contextMenu.markedComplete"]}</I18nTypo>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
