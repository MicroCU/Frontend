"use client";
import PathDescription from "@/components/PathDescription";
import PathPageLoading from "@/components/PathPageLoading";
import DirectedGraph from "@/components/directedGraph/DirectedGraph";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "@/context/Translation";
import { getPathInitialNodesAndEdges } from "@/utils/path";
import { useEffect, useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { fetchPath, updateRecentlyPath } from "@/action/path";
import { useSearchParams } from "next/navigation";
import { usePath } from "@/context/Path";

export default function Path({ params }: { params: { id: string } }) {
  const { pathInfo, setPathInfo } = usePath();
  const [error, setError] = useState<string | null>(null);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const { dict, lang } = useTranslation();

  const searchParams = useSearchParams();
  const x = searchParams.get("x");
  const y = searchParams.get("y");
  const zoom = searchParams.get("zoom");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPath(params.id, lang);
        if (response.status != 200) {
          setError(response.message ? response.message : "Error fetching data");
          return;
        }
        setPathInfo(response.data.path);
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

  if (!pathInfo) {
    return <PathPageLoading />;
  }

  const { initialNodes, initialEdges } = getPathInitialNodesAndEdges(
    pathInfo.groups
  );

  return (
    <div className="w-screen">
      <div className="w-full absolute">
        <PathDescription
          name={pathInfo.name}
          description={pathInfo.description}
          tags={pathInfo.tags}
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
