"use client";
import { GroupTypeEnum } from "@/types/enum";
import Micro, { IMicroProps } from "./Micro";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useEffect, useRef, useState } from "react";

export interface IGroupProps {
  id: string;
  title: string;
  micros: IMicroProps[];
  type: GroupTypeEnum;
}

export default function Group({ id, title, micros, type }: IGroupProps) {
  const [microComponentWidth, setMicroComponentWidth] = useState(0);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getWidth = () => {
      if (groupRef.current) {
        const width = groupRef.current.getBoundingClientRect().width;
        setMicroComponentWidth(width);
      }
    };

    getWidth();
    window.addEventListener("resize", getWidth);

    return () => {
      window.removeEventListener("resize", getWidth);
    };
  }, [id]);

  return (
    <div ref={groupRef}>
      {type === GroupTypeEnum.Ordered ? (
        <div className="flex flex-col bg-white w-fit h-fit justify-center content-center gap-y-4 rounded-2xl pt-4 pb-4">
          <div
            className="pl-4 pr-4 w-fit"
            style={{ maxWidth: microComponentWidth }}
          >
            <p className="uppercase Bold16 text-progress overflow-hidden whitespace-nowrap overflow-ellipsis">
              {title}
            </p>
          </div>
          <ScrollArea
            className={`w-fit ${
              micros.length >= 3 ? "h-44" : "h-28"
            } border-none`}
          >
            <div
              className="flex flex-col w-fit h-fit justify-center content-center gap-y-4 pl-4 pr-4"
              id={`micros-display-${id}`}
            >
              {micros.map((micro, index) => (
                <Micro
                  id={micro.id}
                  title={micro.title}
                  progress={micro.progress}
                  type={micro.type}
                  isGroup={micro.isGroup}
                  key={micro.id}
                  className="mx-auto"
                />
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      ) : (
        <div className="flex flex-col bg-white w-fit h-fit justify-center content-center gap-y-4 rounded-2xl pl-4 pr-4">
          <div
            className="pt-4 w-full"
            style={{ maxWidth: microComponentWidth }}
          >
            <p className="uppercase Bold16 text-progress overflow-hidden whitespace-nowrap overflow-ellipsis">
              {title}
            </p>
          </div>
          <ScrollArea className="max-w-[656px] h-fit border-none">
            <div
              className="flex flex-row bg-white w-fit h-fit justify-center content-center gap-x-4 rounded-2xl pb-4"
              id={`micros-display-${id}`}
            >
              {micros.map((micro, index) => (
                <Micro
                  id={micro.id}
                  title={micro.title}
                  progress={micro.progress}
                  type={micro.type}
                  isGroup={micro.isGroup}
                  key={micro.id}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
