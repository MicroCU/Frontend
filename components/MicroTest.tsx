"use client";
import { MicroData } from "@/types/type";
import { useRef } from "react";
import { useOverflowDetection } from "@/hooks/Overflow";
import OverflowTooltip from "./OverflowTooltip";

interface MicroTestProps {
  data: MicroData;
  className?: string;
}

export default function MicroTest({ data, className }: MicroTestProps) {
  const containerOverflowRef = useRef<HTMLDivElement>(null);
  const isOverflow = useOverflowDetection(containerOverflowRef, data.name);
  return (
    <div
      className={`border-3 p-4 rounded-2xl w-fit ${
        data.progress > 0 ? "bg-progressLight" : "bg-primaryLight"
      } ${className}`}
    >
      <OverflowTooltip text={data.name} isOverflowing={isOverflow}>
        <div
          className={`${
            data.progress > 0 ? "bg-progress" : "bg-primary"
          } relative w-fit h-fit rounded-lg px-5 py-3 text-white text-center Bold16 flex items-center justify-center max-w-52 ${className}`}
        >
          <p
            className="overflow-hidden whitespace-nowrap overflow-ellipsis"
            ref={containerOverflowRef}
          >
            {data.name}
          </p>
        </div>
      </OverflowTooltip>
    </div>
  );
}
