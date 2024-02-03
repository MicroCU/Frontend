"use client";
import { useJourneyGraph } from "@/context/JourneysGraph";
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
  const { journeys } = useJourneyGraph();
  return (
    <div className={`${className} flex flex-col gap-y-6`}>
      {journeys &&
        journeys.data.map((journey) => (
          <JourneyItem {...journey} key={journey.id} />
        ))}
      {type === JourneyItemsType.Loading && <JourneyItemsLoading />}
    </div>
  );
}
