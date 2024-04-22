"use client";
import PathDescription from "@/components/PathDescription";
import PathPageLoading from "@/components/PathPageLoading";
import DirectedGraph from "@/components/directedGraph/DirectedGraph";
import { getPathInitialNodesAndEdges } from "@/utils/path";
import { useEffect, useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { useSearchParams } from "next/navigation";
import { usePath } from "@/context/Path";

export default function Path({ params }: { params: { id: string } }) {
  const { pathInfo, setSelectedPathId } = usePath();
  const [descriptionHeight, setDescriptionHeight] = useState(0);

  const searchParams = useSearchParams();
  const x = searchParams.get("x");
  const y = searchParams.get("y");
  const zoom = searchParams.get("zoom");

  useEffect(() => {
    setSelectedPathId(params.id);
  }, []);

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
