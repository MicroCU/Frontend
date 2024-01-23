"use client";
import { useScreenContext } from "@/components/context/ScreenContext";
import DirectedGraph from "@/components/path";
import { MicroTypeEnum } from "@/types/enum";
import { ReactFlowProvider } from "reactflow";
import { getInitialNodesAndEdges } from "./api";

export default function Path({ params }: { params: { id: number } }) {
  const { screenWidth, screenHeight } = useScreenContext();
  const { initialNodes, initialEdges } = getInitialNodesAndEdges(params.id);

  console.log("initialNodes", initialNodes);
  console.log("initialEdges", initialEdges);
  console.log("screenWidth", screenWidth);
  console.log("screenHeight", screenHeight);

  return (
    <div>
      <div className="w-screen" style={{ height: "5vh" }}>
        <h1 className="h-full text-left bg-success">Path Information Naja</h1>
      </div>
      <div className="w-screen bg-graySmall" style={{ height: "95vh" }}>
        {screenWidth !== null && screenHeight != null && (
          <ReactFlowProvider>
            <DirectedGraph
              initialNodes={initialNodes}
              initialEdges={initialEdges}
            />
          </ReactFlowProvider>
        )}
        {(screenWidth === null || screenHeight == null) && <p>Loading...</p>}
      </div>
    </div>
  );
}
