"use client";
import { useOverflowDetection } from "@/hooks/Overflow";
import { Micro } from "@/types/path";
import { useRef } from "react";
import OverflowTooltip from "./OverflowTooltip";

interface MicroPracticeProps {
  data: Micro;
  className?: string;
}

export default function MicroPractice({ data, className }: MicroPracticeProps) {
  const containerOverflowRef = useRef<HTMLDivElement>(null);
  const isOverflow = useOverflowDetection(containerOverflowRef, data.title);
  return (
    <>
      <OverflowTooltip text={data.title} isOverflowing={isOverflow}>
        <div
          className={`${
            data.progress > 0 ? "bg-progress" : "bg-primary"
          } relative w-fit h-fit rounded-lg px-5 py-3 text-white text-center Bold16 flex items-center justify-center max-w-52 ${className}`}
        >
          <p
            className="overflow-hidden whitespace-nowrap overflow-ellipsis"
            ref={containerOverflowRef}
          >
            {data.title}
          </p>
        </div>
      </OverflowTooltip>
    </>
  );
}
