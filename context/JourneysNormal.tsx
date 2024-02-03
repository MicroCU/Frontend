"use client";
import { MenuTab } from "@/types/enum";
import { JourneyData } from "@/types/type";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from "react";

interface JourneyNormalContextType {
  journeys: JourneyData[] | null;
  setJourneys: Dispatch<SetStateAction<JourneyData[] | null>>;
}

const JourneyNormalContext = createContext<JourneyNormalContextType>({
  journeys: null,
  setJourneys: () => {}
});

export function useJourneyNormal() {
  return useContext(JourneyNormalContext);
}

export function JourneyNormalContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [journeys, setJourneys] = useState<JourneyData[] | null>(null);
  return (
    <JourneyNormalContext.Provider
      value={{
        journeys,
        setJourneys
      }}
    >
      {children}
    </JourneyNormalContext.Provider>
  );
}
