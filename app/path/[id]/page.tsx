"use client";
import DirectedGraph from "@/components/path";
import { useScreenContext } from "@/components/context/ScreenContext";
import { ReactFlowProvider } from "reactflow";
import { getInitialNodesAndEdges } from "./node-edges";
import { getLayoutedElements } from "./dagre";

export default function Path() {
  const { screenWidth, screenHeight } = useScreenContext();
  const { initialNodes, initialEdges } = getInitialNodesAndEdges();
  const {
    nodes: lNode,
    edges: lEdge,
    rootInfo
  } = getLayoutedElements(initialNodes, initialEdges);

  return (
    <div>
      <div className="w-screen" style={{ height: "5vh" }}>
        <h1 className="h-full text-center bg-success"> 1 </h1>
      </div>
      <div className="w-screen bg-graySmall" style={{ height: "95vh" }}>
        {screenWidth !== null && screenHeight != null && (
          <ReactFlowProvider>
            <DirectedGraph
              screenWidth={screenWidth}
              screenHeight={screenHeight}
              initialNodes={lNode}
              initialEdges={lEdge}
            />
          </ReactFlowProvider>
        )}
        {(screenWidth === null || screenHeight == null) && <p>Loading...</p>}
      </div>
    </div>
  );
}
