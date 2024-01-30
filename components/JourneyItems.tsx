"use client";
import { useJourney } from "@/context/Journeys";
import JourneyItem from "./JourneyItem";
import JourneyItemsLoading from "./JourneyItemsLoading";

export enum JourneyItemsType {
  "Loading" = "loading",
  "Shown" = "shown"
}

export interface JourneyItemsProps {
  className?: string;
  type?: JourneyItemsType;
}

export default function JourneyItems({ className, type }: JourneyItemsProps) {
  const { journeys } = useJourney();
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
