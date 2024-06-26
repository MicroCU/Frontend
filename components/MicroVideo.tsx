"use client";
import { cn } from "@/lib/utils";
import { Micro } from "@/types/path";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useViewport } from "reactflow";
import MicroContextMenu from "./MicroContextMenu";
import { MicroType } from "@/types/enum";
import I18nTypo from "./ui/I18nTypo";

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
    <MicroContextMenu
      microType={MicroType.Video}
      id={data.id}
      viewport={{ x: x, y: y, zoom: zoom }}
      sourceId={data.video?.sourceId}
      sourceType={data.video?.sourceType}
    >
      <Link href={`${pathName}/video/${data.id}`}>
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
            <I18nTypo className="break-words">{data.name}</I18nTypo>
          </div>
          {data.progress > 0 && data.progress <= 100 && (
            <div
              className="absolute bottom-0 left-0 h-1 bg-primary"
              style={{ width: data.progress + "%" }}
            ></div>
          )}
        </div>
      </Link>
    </MicroContextMenu>
  );
}
