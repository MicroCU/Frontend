"use client";
import { IMicroData } from "@/types/type";
import { useRef } from "react";
import { useOverflowDetection } from "@/hooks/Overflow";
import OverflowTooltip from "./OverflowTooltip";

interface MicroPracticeProps {
  data: IMicroData;
  className?: string;
}

export default function MicroPractice({ data, className }: MicroPracticeProps) {
  const containerOverflowRef = useRef<HTMLDivElement>(null);
  const isOverflow = useOverflowDetection(containerOverflowRef, data.name);
  return (
    <div
      className={`${
        data.progress > 0 ? "bg-progress" : "bg-primary"
      } relative w-fit h-fit rounded-lg ${className}`}
    >
      <OverflowTooltip text={data.name} isOverflowing={isOverflow}>
        <div className="w-fit h-full px-5 py-3 text-white text-center Bold16 flex items-center justify-center max-w-52">
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
