"use client";
import PathDescription from "@/components/PathDescription";
import PathPageLoading from "@/components/PathPageLoading";
import DirectedGraph from "@/components/directedGraph/DirectedGraph";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "@/context/Translation";
import { PathData } from "@/types/type";
import { getPathInitialNodesAndEdges } from "@/utils/path";
import { useEffect, useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { fetchPath, updateRecentlyPath } from "@/action/path";
import { useSearchParams } from "next/navigation";

export default function Path({ params }: { params: { id: string } }) {
  const [data, setData] = useState<PathData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const { dict } = useTranslation();

  const searchParams = useSearchParams();
  const x = searchParams.get("x");
  const y = searchParams.get("y");
  const zoom = searchParams.get("zoom");

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
    <div className="w-screen">
      <div className="w-full absolute">
        <PathDescription
          name={data.name}
          description={data.description}
          tags={data.tags}
          setHeight={setDescriptionHeight}
        />
      </div>
      <div className="w-screen bg-graySmall h-screen">
        <ReactFlowProvider>
          <DirectedGraph
            initialNodes={initialNodes}
            initialEdges={initialEdges}
            initialViewport={{
              x: x ? parseFloat(x) : null,
              y: y ? parseFloat(y) : null,
              zoom: zoom ? parseFloat(zoom) : null
            }}
            descriptionHeight={descriptionHeight}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
}
