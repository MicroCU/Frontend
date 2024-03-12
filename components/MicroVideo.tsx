"use client";
import { cn } from "@/lib/utils";
import { Micro } from "@/types/path";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useViewport } from "reactflow";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from "./ui/context-menu";

interface MicroVideoProps {
  data: Micro;
  isGroup: boolean;
  className?: string;
}

export default function MicroVideo({
  data,
  isGroup,
  className
}: MicroVideoProps) {
  const { x, y, zoom } = useViewport();
  const pathName = usePathname();

  const handleClick = () => {
    localStorage.setItem(
      "pathData",
      JSON.stringify({
        viewport: { id: data.id, x: x, y: y, zoom: zoom },
        pathName: pathName
      })
    );
  };

  return (
    <>
      <Link href={`${pathName}/video/${data.id}`}>
        <ContextMenu>
          <ContextMenuTrigger className="w-fit">
            <div
              className={cn(
                isGroup ? "bg-grayLight" : "bg-white",
                "relative w-fit h-fit rounded-lg",
                className
              )}
              onClick={(e) => {
                handleClick();
              }}
            >
              <div className="w-fit h-full px-5 py-3 text-center Bold16 flex items-center justify-center max-w-52">
                <p className="break-words">{data.title}</p>
              </div>
              {data.progress > 0 && data.progress <= 100 && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-primary"
                  style={{ width: data.progress + "%" }}
                ></div>
              )}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64 rounded-lg bg-white shadow-md border border-graySmall">
            <ContextMenuItem inset className="text-grayMain">
              Marked as completed
            </ContextMenuItem>
            <ContextMenuSeparator className="bg-graySmall" />
            <ContextMenuItem inset className="text-grayMain">
              View video
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Link>
    </>
  );
}
