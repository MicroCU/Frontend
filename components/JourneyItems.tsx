"use client";
import { useState } from "react";
import JourneyItem, { IPathItems } from "./JourneyItem";
import { Skeleton } from "@/components/ui/skeleton";

export interface IJourneyItem {
  id: string;
  name: string;
  paths: IPathItems[];
}

export enum JourneyItemsType {
  "Loading" = "loading",
  "Shown" = "shown"
}

export interface JourneyItemsProps {
  journeys?: IJourneyItem[];
  width?: number;
  className?: string;
  type: JourneyItemsType;
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
      {type === JourneyItemsType.Loading && (
        <>
          <Skeleton className="h-8 w-full bg-grayLight" />
          <Skeleton className="h-8 w-full bg-graySmall" />
          <Skeleton className="h-8 w-full bg-grayLight" />
          <Skeleton className="h-8 w-full bg-graySmall" />
          <Skeleton className="h-8 w-full bg-grayLight" />
        </>
      )}
    </div>
  );
}
