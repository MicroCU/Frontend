"use client";
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
  className?: string;
  type?: JourneyItemsType;
}

export default function JourneyItems({
  journeys,
  className,
  type
}: JourneyItemsProps) {
  return (
    <div className={`${className} flex flex-col gap-y-6 max-w-72`}>
      {journeys &&
        journeys.map((journey) => (
          <JourneyItem {...journey} key={journey.id} />
        ))}
      {type === JourneyItemsType.Loading && <JourneyItemsLoading />}
    </div>
  );
}
