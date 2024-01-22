"use client";
import { GroupTypeEnum } from "@/types/enum";
import Micro from "./Micro";
import GroupScrollArea from "./GroupScrollArea";
import { IMicroData } from "@/types/type";
import { useOverflowDetection } from "@/hooks/Overflow";
import { useRef } from "react";
import OverflowTooltip from "./OverflowTooltip";

export interface IUnorderedGroupProps {
  id: string;
  title: string;
  micros: IMicroData[];
  maxMicroComponentWidth: number;
  isScrollable?: boolean;
}

export default function UnorderedGroup({
  id,
  title,
  micros,
  maxMicroComponentWidth,
  isScrollable
}: IUnorderedGroupProps) {
  const containerOverflowRef = useRef<HTMLDivElement>(null);
  const isOverflow = useOverflowDetection(
    containerOverflowRef,
    title,
    maxMicroComponentWidth
  );

  return (
    <div className="flex flex-col bg-white w-fit h-fit justify-center content-center gap-y-4 rounded-2xl pl-4 pr-4">
      <OverflowTooltip text={title} isOverflowing={isOverflow}>
        <div
          className="pt-4 w-full"
          style={{ maxWidth: maxMicroComponentWidth }}
        >
          <p
            className="uppercase Bold16 text-progress overflow-hidden whitespace-nowrap overflow-ellipsis"
            ref={containerOverflowRef}
          >
            {title}
          </p>
        </div>
      </OverflowTooltip>
      <GroupScrollArea
        type={GroupTypeEnum.Unordered}
        microLength={micros.length}
        isScrollable={isScrollable}
      >
        <div className="flex flex-row bg-white w-fit h-fit justify-center content-center gap-x-4 rounded-2xl pb-4">
          {micros.map((micro, index) => (
            <Micro data={micro} isGroup={true} key={micro.id} />
          ))}
        </div>
      </GroupScrollArea>
    </div>
  );
}
