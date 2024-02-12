"use client";
import PathDescription from "@/components/PathDescription";
import PathPageLoading from "@/components/PathPageLoading";
import DirectedGraph from "@/components/DirectedGraph";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "@/context/Translation";
import { PathData } from "@/types/type";
import { getPathInitialNodesAndEdges } from "@/utils/path";
import { useEffect, useRef, useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { fetchPath, updateRecentlyPath } from "@/action/path";

export default function Path({ params }: { params: { id: string } }) {
  const flowRef = useRef(null);
  const [data, setData] = useState<PathData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { dict } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPath(params.id);
        if (response.status != 200) {
          setError(response.message ? response.message : "Error fetching data");
          return;
        }
        setData(response.data.path);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    updateRecentlyPath(params.id);
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: dict["path.general.error"],
        description: error
      });
      setError(null);
    }
  }, [error]);

  if (!data) {
    return <PathPageLoading />;
  }

  const { initialNodes, initialEdges } = getPathInitialNodesAndEdges(
    data.groups
  );

  return (
    <div className="overflow-y-scroll w-screen">
      <div className="w-full relative z-50">
        <PathDescription
          name={data.name}
          description={data.description}
          tags={data.tags}
        />
      </div>
      <div
        ref={flowRef}
        className="w-screen bg-graySmall"
        style={{ height: "100vh" }}
      >
        <ReactFlowProvider>
          <DirectedGraph
            flowRef={flowRef}
            initialNodes={initialNodes}
            initialEdges={initialEdges}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
}
