"use client";
import { useOverflowDetection } from "@/hooks/Overflow";
import { Micro } from "@/types/path";
import { useRef } from "react";
import OverflowTooltip from "./OverflowTooltip";

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
  const containerOverflowRef = useRef<HTMLDivElement>(null);
  const isOverflow = useOverflowDetection(containerOverflowRef, data.title);
  return (
    <div
      className={`${
        isGroup ? "bg-grayLight" : "bg-white"
      } relative w-fit h-fit rounded-lg ${className}`}
    >
      <OverflowTooltip text={data.title} isOverflowing={isOverflow}>
        <div className="w-fit h-full px-5 py-3 text-center Bold16 flex items-center justify-center max-w-52">
          <p
            className="overflow-hidden whitespace-nowrap overflow-ellipsis"
            ref={containerOverflowRef}
          >
            {data.title}
          </p>
        </div>
      </OverflowTooltip>
      {data.progress > 0 && data.progress <= 100 && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-primary"
          style={{ width: data.progress + "%" }}
        ></div>
      )}
    </div>
  );
}
