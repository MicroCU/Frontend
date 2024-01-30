"use client";
import { JourneyData } from "@/types/type";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from "react";

interface JourneyContextType {
  journeys: JourneyData[] | null;
  setJourneys: Dispatch<SetStateAction<JourneyData[] | null>>;
}

const JourneyContext = createContext<JourneyContextType>({
  journeys: null,
  setJourneys: () => {}
});

export function useJourney() {
  return useContext(JourneyContext);
}

export function JourneyContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [journeys, setJourneys] = useState<JourneyData[] | null>(null);
  return (
    <JourneyContext.Provider value={{ journeys, setJourneys }}>
      {children}
    </JourneyContext.Provider>
  );
}
