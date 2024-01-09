"use client";
import { useState } from "react";
import JourneyItem, { IPathItems } from "./JourneyItem";

export interface IJourneyItem {
  id: string;
  name: string;
  paths: IPathItems[];
}

export interface JourneyItemsProps {
  journeys: IJourneyItem[];
  width?: number;
  className?: string;
}

export default function JourneyItems({
  journeys,
  className,
  width
}: JourneyItemsProps) {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  return (
    <div
      className={`${className} flex flex-col gap-y-[25px]`}
      style={{ maxWidth: width }}
    >
      {journeys.map((journey) => (
        <JourneyItem
          {...journey}
          key={journey.id}
          selectedPath={selectedPath}
          setSelectedPath={setSelectedPath}
          width={width}
        />
      ))}
    </div>
  );
}
