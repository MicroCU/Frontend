"use client";
import { GroupTypeEnum } from "@/types/enum";
import Micro, { IMicroProps } from "./Micro";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export interface IGroupProps {
  title: string;
  micros: IMicroProps[];
  type: GroupTypeEnum;
}

export default function Group({ title, micros, type }: IGroupProps) {
  const [totalWidth, setTotalWidth] = useState(0);
  const [microsWidth, setMicrosWidth] = useState<Map<number, number>>(
    new Map()
  );
  const handleWidth = (index: number, width: number) => {
    setMicrosWidth((prev) => {
      prev.set(index, width);
      return prev;
    });
  };
  useEffect(() => {
    setTotalWidth(calculateTotalWidth(microsWidth));
  }, [microsWidth]);
  return (
    <>
      {type === GroupTypeEnum.Ordered ? (
        <div className="flex flex-col bg-white w-fit h-fit justify-center content-center gap-y-4 rounded-2xl pt-4 pb-4">
          <div
            className="pl-4 pr-4"
            style={{ maxWidth: getMaxWidth(microsWidth) }}
          >
            <p className="uppercase Bold16 text-progress overflow-hidden whitespace-nowrap overflow-ellipsis">
              {" "}
              {title}{" "}
            </p>
          </div>
          <ScrollArea className="w-fit h-44 border-none">
            <div className="flex flex-col w-fit h-fit justify-center content-center gap-y-4 pl-4 pr-4">
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
          <div className="pt-4" style={{ maxWidth: totalWidth }}>
            <p className="uppercase Bold16 text-progress overflow-hidden whitespace-nowrap overflow-ellipsis">
              {" "}
              {title}
            </p>
          </div>
          <ScrollArea className="w-[656px] h-fit border-none">
            <div className="flex flex-row bg-white w-fit h-fit justify-center content-center gap-x-4 rounded-2xl pb-4">
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
    </>
  );
}

function calculateTotalWidth(totalWidth: Map<number, number>) {
  // TODO: Only first 3 and should plus padding
  let total = 0;
  totalWidth.forEach((width) => {
    total += width;
  });
  return total;
}

function getMaxWidth(totalWidth: Map<number, number>) {
  let max = 0;
  totalWidth.forEach((width) => {
    if (width > max) {
      max = width;
    }
  });
  return max + 32;
}
