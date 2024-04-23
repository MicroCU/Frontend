import { MicroType } from "@/types/enum";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator
} from "./ui/context-menu";
import { useTranslation } from "@/context/Translation";
import { markedAsCompleteVideo, updateRecentlyPath } from "@/action/path";
import { usePathname, useRouter } from "next/navigation";
import I18nTypo from "./ui/I18nTypo";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { usePath } from "@/context/Path";

interface MicroContextMenuProps {
  children: React.ReactNode;
  id: string;
  microType: MicroType;
  sourceId?: string;
  sourceType?: string;
  testLink?: string;
  viewport?: { x: number; y: number; zoom: number };
}

export default function MicroContextMenu({
  children,
  id,
  microType,
  viewport,
  sourceId,
  sourceType,
  testLink
}: MicroContextMenuProps) {
  const { dict } = useTranslation();
  const pathName = usePathname();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { setPathInfo, setSelectedMicroId } = usePath();
  const handleMarkedAsComplete = () => {
    const updateToAPI = async () => {
      try {
        if (!sourceType || !sourceId) {
          return;
        }
        const response = await markedAsCompleteVideo(sourceType, sourceId);
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
          setSelectedMicroId(id);
        }
        if (response?.status != 200) {
          setError(response?.msg ? response.msg : "Error fetching data");
          return;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (microType === MicroType.Video) {
      updateToAPI();
    }
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
    } else if (microType === MicroType.Test) {
      window.open(testLink);
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
        <ContextMenuItem
          inset
          onClick={handleMarkedAsComplete}
          disabled={microType != MicroType.Video}
        >
          <I18nTypo>{dict["micro.contextMenu.markedComplete"]}</I18nTypo>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
