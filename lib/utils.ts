import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { JourneyStoreData } from "@/types/type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkIsDataFieldsValid(journeys: JourneyStoreData | null) {
  return (
    journeys &&
    journeys.data &&
    journeys.data.length > 0
  )
}