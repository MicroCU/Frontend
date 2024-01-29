"use client";
import { BriefPathInfo } from "@/types/type";
import { createContext, useContext, useState } from "react";

interface SelectedPathContextType {
  selectedPath: BriefPathInfo | null;
  setSelectedPath: (path: BriefPathInfo | null) => void;
}

const SelectedPathContext = createContext<SelectedPathContextType>({
  selectedPath: null,
  setSelectedPath: () => {}
});

export function useSelectedPath() {
  return useContext(SelectedPathContext);
}

export function SelectedPathContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [selectedPath, setSelectedPath] = useState<BriefPathInfo | null>(null);
  return (
    <SelectedPathContext.Provider value={{ selectedPath, setSelectedPath }}>
      {children}
    </SelectedPathContext.Provider>
  );
}
