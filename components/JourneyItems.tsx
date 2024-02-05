"use client";
import { useJourney } from "@/context/Journeys";
import JourneyItem from "./JourneyItem";
import ListItemsLoading from "./ListLoading";

export interface JourneyItemsProps {
  className?: string;
}

export default function JourneyItems({ className }: JourneyItemsProps) {
  const { journeys } = useJourney();
  if (!journeys) {
    return (
      <div className={`${className} flex flex-col gap-y-6`}>
        <ListItemsLoading />
      </div>
    );
  }
  return (
    <div className={`${className} flex flex-col gap-y-6`}>
      {journeys &&
        journeys.data &&
        journeys.data.map((journey) => (
          <JourneyItem {...journey} key={journey.id} />
        ))}
    </div>
  );
}
