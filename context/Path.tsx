"use client";
import { PathData } from "@/types/type";
import React from "react";

interface PathContextType {
  pathInfo: PathData | null;
  setPathInfo: React.Dispatch<React.SetStateAction<PathData | null>>;
  selectedPathId: string;
  setSelectedPathId: React.Dispatch<React.SetStateAction<string>>;
}

const PathContext = React.createContext<PathContextType>({
  pathInfo: null,
  setPathInfo: () => {},
  selectedPathId: "",
  setSelectedPathId: () => {}
});

export function usePath() {
  return React.useContext(PathContext);
}

export function PathContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [pathInfo, setPathInfo] = React.useState<PathData | null>(null);
  const [selectedPathId, setSelectedPathId] = React.useState<string>("");
  return (
    <PathContext.Provider
      value={{ pathInfo, setPathInfo, selectedPathId, setSelectedPathId }}
    >
      {children}
    </PathContext.Provider>
  );
}
