"use client";
import { useJourneyGraph } from "@/context/JourneysGraph";
import JourneyItem from "./JourneyItem";
import ListItemsLoading from "./ListLoading";
import { checkIsDataFieldsValid, cn } from "@/lib/utils";

export interface JourneyItemsProps {
  className?: string;
}

export default function JourneyItems({ className }: JourneyItemsProps) {
  const { journeys } = useJourneyGraph();
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
