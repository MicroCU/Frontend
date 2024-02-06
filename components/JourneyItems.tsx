"use client";
import { useJourney } from "@/context/Journeys";
import JourneyItem from "./JourneyItem";
import ListItemsLoading from "./ListLoading";
import { checkIsDataFieldsValid, cn } from "@/lib/utils";

export interface JourneyItemsProps {
  className?: string;
}

export default function JourneyItems({ className }: JourneyItemsProps) {
  const { journeys } = useJourney();
  if (!journeys) {
    return (
      <div className={cn("flex flex-col gap-y-6", className)}>
        <ListItemsLoading />
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col gap-y-6", className)}>
      {checkIsDataFieldsValid(journeys) &&
        journeys.data.map((journey) => (
          <JourneyItem {...journey} key={journey.id} />
        ))}
    </div>
  );
}
