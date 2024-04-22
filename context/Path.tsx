"use client";
import { ErrorAPI, PathData } from "@/types/type";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "./Translation";
import { fetchPath } from "@/action/path";
import { toast } from "@/components/ui/use-toast";

interface PathContextType {
  pathInfo: PathData | null;
  setPathInfo: React.Dispatch<React.SetStateAction<PathData | null>>;
  selectedMicroId: string;
  setSelectedMicroId: React.Dispatch<React.SetStateAction<string>>;
  pathId: string;
  setSelectedPathId: React.Dispatch<React.SetStateAction<string>>;
  error: ErrorAPI | null;
  setError: Dispatch<SetStateAction<ErrorAPI | null>>;
}

const PathContext = React.createContext<PathContextType>({
  pathInfo: null,
  setPathInfo: () => {},
  selectedMicroId: "",
  setSelectedMicroId: () => {},
  pathId: "",
  setSelectedPathId: () => {},
  error: null,
  setError: () => {}
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
  const [selectedMicroId, setSelectedMicroId] = React.useState<string>("");
  const [pathId, setSelectedPathId] = React.useState<string>("");
  const [error, setError] = React.useState<ErrorAPI | null>(null);

  const { dict, lang } = useTranslation();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: dict["path.general.error"],
        description: error.message
      });
      setError(null);
    }
  }, [error]);

  const handleFetchPathInfo = async (id: string, lang: string) => {
    if (!id) return;
    const result = await fetchPath(id, lang);
    if (result.status !== 200) {
      setError({
        status: result.status,
        message: result.msg ? result.msg : "Unknown error occurred"
      });
      return;
    }

    setPathInfo(result.data.path);
  };

  useEffect(() => {
    handleFetchPathInfo(pathId, lang);
  }, [pathId, lang]);

  return (
    <PathContext.Provider
      value={{
        pathInfo,
        setPathInfo,
        selectedMicroId,
        setSelectedMicroId,
        pathId,
        setSelectedPathId,
        error,
        setError
      }}
    >
      {children}
    </PathContext.Provider>
  );
}
