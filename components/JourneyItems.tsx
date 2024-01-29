"use client";
import JourneyItem, { PathItems } from "./JourneyItem";
import JourneyItemsLoading from "./JourneyItemsLoading";
import { JourneyData } from "@/types/type";

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
  return (
    <div
      className={`${className} flex flex-col gap-y-6`}
      style={{ maxWidth: width }}
    >
      {journeys &&
        journeys.map((journey) => (
          <JourneyItem {...journey} key={journey.id} width={width} />
        ))}
      {type === JourneyItemsType.Loading && <JourneyItemsLoading />}
    </div>
  );
}

function transformDataToNavBarData(mockJourneyData: JourneyData[]) {
  const navBarData: JourneyItem[] = [];
  mockJourneyData.forEach((journeyData) => {
    const paths = journeyData.paths.map((path) => {
      return {
        id: path.id,
        name: path.title
      };
    });
    navBarData.push({
      id: journeyData.id,
      name: journeyData.name,
      paths: paths
    });
  });
  return navBarData;
}
