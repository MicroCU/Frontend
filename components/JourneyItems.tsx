"use client";
import { useState } from "react";
import JourneyItem, { PathItems } from "./JourneyItem";
import JourneyItemsLoading from "./JourneyItemsLoading";

export interface JourneyItem {
  id: string;
  name: string;
  paths: PathItems[];
}

export enum JourneyItemsType {
  "Loading" = "loading",
  "Shown" = "shown"
}

export interface JourneyItemsProps {
  journeys?: JourneyItem[];
  width?: number;
  className?: string;
  type?: JourneyItemsType;
}

export default function JourneyItems({
  journeys,
  className,
  width,
  type
}: JourneyItemsProps) {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  return (
    <div
      className={`${className} flex flex-col gap-y-6`}
      style={{ maxWidth: width }}
    >
      {journeys &&
        journeys.map((journey) => (
          <JourneyItem
            {...journey}
            key={journey.id}
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}
            width={width}
          />
        ))}
      {type === JourneyItemsType.Loading && <JourneyItemsLoading />}
    </div>
  );
}
